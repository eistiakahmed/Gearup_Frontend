'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Dumbbell,
  Compass,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  Store,
  ShieldCheck,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const getDashboardPath = (role?: UserRole) => {
    if (role === UserRole.PROVIDER) return '/dashboard/provider';
    if (role === UserRole.ADMIN) return '/dashboard/admin';
    return '/dashboard/customer';
  };

  const getRoleBadgeVariant = (role?: UserRole) => {
    if (role === UserRole.PROVIDER) return 'provider';
    if (role === UserRole.ADMIN) return 'admin';
    return 'customer';
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Gear', href: '/gear', icon: <Compass className="w-4 h-4" /> },
  ];

  const dashboardPath = getDashboardPath(user?.role);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Dumbbell className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
            GearUp <span className="text-emerald-400 font-bold text-sm">🏋️</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800/80 text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Auth / Profile */}
        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="h-9 w-28 rounded-xl bg-slate-800/60 animate-pulse" />
          ) : isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 p-1.5 pl-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-100 max-w-[120px] truncate">
                    {user.name}
                  </span>
                </div>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role}
                </Badge>
                <ChevronDown className="w-4 h-4 text-slate-400 ml-0.5" />
              </button>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/60 p-2 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-100 truncate">{user.email}</p>
                  </div>

                  <Link
                    href={dashboardPath}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                    <span>Dashboard</span>
                  </Link>

                  {user.role === UserRole.CUSTOMER && (
                    <Link
                      href="/dashboard/customer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-cyan-400" />
                      <span>My Rentals</span>
                    </Link>
                  )}

                  {user.role === UserRole.PROVIDER && (
                    <Link
                      href="/dashboard/provider/orders"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors"
                    >
                      <Store className="w-4 h-4 text-amber-400" />
                      <span>Incoming Orders</span>
                    </Link>
                  )}

                  {user.role === UserRole.ADMIN && (
                    <Link
                      href="/dashboard/admin/users"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span>User Management</span>
                    </Link>
                  )}

                  <div className="border-t border-slate-800/80 my-1" />

                  <button
                    type="button"
                    onClick={() => logout()}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 flex flex-col gap-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-800 pt-3 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center justify-between px-3 py-1">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-slate-100">{user.name}</span>
                  </div>
                  <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                </div>

                <Link
                  href={dashboardPath}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-sm font-semibold text-emerald-400"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </Link>

                <Button
                  variant="danger"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" fullWidth>
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" fullWidth>
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
