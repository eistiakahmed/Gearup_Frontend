# 🔌 GearUp - Frontend & Backend API Integration Document

Reference document mapping Next.js App Router frontend components to backend REST API endpoints.

---

## 🗺️ API Mapping Table

| Next.js App Router Route | Frontend Component / Module | HTTP Method & Backend API Endpoint | Authentication & Permission |
| :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` (Homepage) | `GET /api/gear?limit=6&sortBy=createdAt`<br>`GET /api/reviews/recent` | Public |
| `/gear` | `src/app/(public)/gear/page.tsx` (Catalog) | `GET /api/gear`<br>`GET /api/categories` | Public |
| `/gear/[id]` | `src/app/(public)/gear/[id]/page.tsx` | `GET /api/gear/:id`<br>`POST /api/rentals` | Public / Customer Auth |
| `/register` | `src/app/(auth)/register/page.tsx` | `POST /api/auth/register` | Public |
| `/login` | `src/app/(auth)/login/page.tsx` | `POST /api/auth/login` | Public |
| `/dashboard/customer` | `src/app/dashboard/customer/page.tsx` | `GET /api/rentals`<br>`GET /api/payments`<br>`POST /api/reviews` | Authenticated Customer |
| `/dashboard/customer/orders/[id]/pay` | `src/app/dashboard/customer/orders/[id]/pay/page.tsx` | `POST /api/payments/create` | Authenticated Customer |
| `/payment/success` | `src/app/payment/success/page.tsx` | `POST /api/payments/verify-session` | Authenticated Customer |
| `/payment/cancel` | `src/app/payment/cancel/page.tsx` | UI State Feedback | Authenticated Customer |
| `/dashboard/provider` | `src/app/dashboard/provider/page.tsx` | `GET /api/provider/gear`<br>`PATCH /api/provider/gear/:id`<br>`DELETE /api/provider/gear/:id` | Authenticated Provider |
| `/dashboard/provider/gear/new` | `src/app/dashboard/provider/gear/new/page.tsx` | `POST /api/provider/gear`<br>`GET /api/categories` | Authenticated Provider |
| `/dashboard/provider/orders` | `src/app/dashboard/provider/orders/page.tsx` | `GET /api/provider/orders`<br>`PATCH /api/provider/orders/:id` | Authenticated Provider |
| `/dashboard/admin` | `src/app/dashboard/admin/page.tsx` | `GET /api/admin/stats` | Authenticated Admin |
| `/dashboard/admin/users` | `src/app/dashboard/admin/users/page.tsx` | `GET /api/admin/users`<br>`PATCH /api/admin/users/:id` | Authenticated Admin |
| `/dashboard/admin/gear` | `src/app/dashboard/admin/gear/page.tsx` | `GET /api/admin/gear` | Authenticated Admin |
| `/dashboard/admin/orders` | `src/app/dashboard/admin/orders/page.tsx` | `GET /api/admin/rentals` | Authenticated Admin |

---

## 🔑 Authentication & Authorization Flow

- **Session Handling**: JWT token delivered via Secure HTTP-Only Cookies / LocalStorage.
- **Route Guarding**: Next.js 16 `proxy.ts` (`src/proxy.ts`) guards `/dashboard/customer/*`, `/dashboard/provider/*`, and `/dashboard/admin/*` routes.
- **Role-Based Access Control (RBAC)**:
  - **CUSTOMER**: Access to customer dashboard, rental booking, payment checkout, and leaving reviews.
  - **PROVIDER**: Access to provider workspace, equipment inventory CRUD, status toggles, and incoming order management.
  - **ADMIN**: Access to global system metrics, user moderation (suspend/activate), catalog moderation, and platform order monitoring.

---

## 💳 Payment Gateway Flow

1. **Initiation**: Customer selects rental dates and clicks **Pay Now** at `/dashboard/customer/orders/[id]/pay`.
2. **Gateway**: `POST /api/payments/create` calls Stripe SDK to generate a 256-Bit SSL Encrypted Hosted Checkout session URL.
3. **Redirection**: Browser redirects user to Stripe Hosted Checkout.
4. **Verification**: Upon successful checkout, user is redirected back to `/payment/success?session_id=cs_test_...`.
5. **Revalidation**: `/payment/success` invokes `POST /api/payments/verify-session`, updating order status to `PAID` in database and revalidating SWR state.
