import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from '@/types/auth';

interface JwtPayload {
  userId?: string;
  email?: string;
  role?: UserRole;
  exp?: number;
}

/**
 * Safely decode JWT payload without external libraries in Edge environment
 */
function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload) as JwtPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Next.js 16 Proxy for request interception, authentication, and role route guarding
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;

  const payload = token ? decodeJwtPayload(token) : null;
  const isExpired = payload?.exp ? payload.exp * 1000 < Date.now() : true;
  const isAuthenticated = Boolean(payload && !isExpired);
  const userRole = payload?.role;

  // Determine user's primary dashboard URL
  const getRoleDashboard = (role?: UserRole): string => {
    if (role === UserRole.PROVIDER) return '/dashboard/provider';
    if (role === UserRole.ADMIN) return '/dashboard/admin';
    return '/dashboard/customer';
  };

  const isAuthPage =
    pathname === '/login' ||
    pathname === '/register' ||
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register');

  // 1. Guard Auth Pages (/login, /register, /auth/login, /auth/register) for already logged-in users
  if (isAuthenticated && isAuthPage) {
    const targetDashboard = getRoleDashboard(userRole);
    return NextResponse.redirect(new URL(targetDashboard, request.url));
  }

  // 2. Guard Protected Dashboard Routes (/dashboard/*) for unauthenticated users
  if (!isAuthenticated && pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Role-Based Access Control inside Dashboard Routes
  if (isAuthenticated && pathname.startsWith('/dashboard')) {
    // Admin routes restriction
    if (pathname.startsWith('/dashboard/admin') && userRole !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL(getRoleDashboard(userRole), request.url));
    }

    // Provider routes restriction
    if (
      pathname.startsWith('/dashboard/provider') &&
      userRole !== UserRole.PROVIDER &&
      userRole !== UserRole.ADMIN
    ) {
      return NextResponse.redirect(new URL(getRoleDashboard(userRole), request.url));
    }
  }

  return NextResponse.next();
}

/**
 * Matcher configuration for Next.js 16 Proxy
 */
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/auth/login',
    '/auth/register',
  ],
};
