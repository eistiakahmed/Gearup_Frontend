# GearUp - Sports & Outdoor Equipment Rental Platform

![Next.js 16.2.12](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss)
![SWR](https://img.shields.io/badge/SWR-2.0-black?style=for-the-badge)
![Stripe API](https://img.shields.io/badge/Stripe-Checkout-6772E5?style=for-the-badge&logo=stripe)

**GearUp** is a modern, high-performance, full-featured web application designed for renting sports, gym, and outdoor adventure equipment. Built with **Next.js 16 App Router**, **TypeScript**, **Tailwind CSS v4**, and **SWR**, GearUp seamlessly connects sports enthusiasts with local equipment providers and provides real-time order lifecycle tracking, Stripe payment checkout, and multi-role administrative moderation.

---

## Key Highlights & Design System

- **Clean Light Theme**: Tailored modern interface with sleek white/slate backgrounds (`#f8fafc` / `#ffffff`) and high-contrast Emerald Green primary accents (`#059669`).
- **Dynamic Role-Based Access Control (RBAC)**: Tailored navigation bars, sidebars, and workspaces dynamically rendered for **Customer**, **Gear Provider**, and **Platform Admin** roles.
- **Next.js 16 Route Protection**: Protected routes guarded pre-rendering via Next.js 16 `proxy.ts`.
- **Real-Time Data Fetching & SWR Mutations**: Automatic cache revalidation and optimistic updates without full page reloads.
- **Stripe Hosted Checkout Integration**: End-to-end 256-Bit SSL Encrypted checkout flow with dedicated success and cancellation feedback handling.

---

## Features Matrix by Role

### 1. Public & Guest Users
- **Hero & Features Overview**: Interactive hero section highlighting instant equipment rentals, platform advantages, and quick catalog navigation.
- **Responsive Equipment Catalog Grid**: Optimized image cards (`next/image`), daily rental rates (`$/day`), category badges, location tags, and availability indicators.
- **Advanced Search & Multi-Filter**: Real-time search by equipment name/keyword, category selector, min/max price range sliders, and sorting options (Date Added, Daily Rate, Name).
- **Comprehensive Equipment Details View**: Multi-image thumbnail gallery switcher, technical specifications grid, verified provider partner cards, and pickup location details.
- **Interactive "Rent Now" Date Range Picker**: Real-time total rental days calculation, start/end date validation (prevents past dates), quantity selector, and instant checkout submission.
- **Live Customer Testimonials**: Real-time customer reviews section displaying star ratings, customer feedback quotes, and verified renter badges.
- **Skeleton Loaders & Graceful Error Fallbacks**: Shimmering card skeletons (`GearSkeleton`), loading spinners (`loading.tsx`), root Error Boundaries (`error.tsx`), and custom 404 screens (`not-found.tsx`).

---

###  2. Customer Role
- **Secure Authentication**: Registration and Login forms with real-time password strength checklists (length, uppercase, lowercase, number) and field-level validation messages.
- **Checkout Payment Flow**: Dedicated `/dashboard/customer/orders/[id]/pay` checkout page launching Stripe Hosted Checkout.
- **Payment Outcome Pages**:
  - `/payment/success`: Validates Stripe session token via `POST /api/payments/verify-session`, updates order status to `PAID`, and presents pickup instructions.
  - `/payment/cancel`: Clear cancellation notification and retry payment CTA.
- **Customer Workspace Dashboard**:
  - **Metrics Overview**: Total Orders, Active Rentals, Completed Rentals, Total Spent.
  - **Rental Order History Table**: Tracks orders with real-time UI Status Badges and contextual action buttons (**Pay Now**, **Awaiting Pickup**, **Active Rental**, **Leave Review**).
  - **Payment History Table**: Transaction records detailing Payment ID, Order Reference, Amount, Method, Status, and Date.
  - **Leave Review Modal**: Interactive modal opening when gear is returned (`RETURNED`) to submit 1-5 star ratings and comments.

---

###  3. Gear Provider Role
- **Provider Workspace Overview**: Real-time metrics tracking **Listed Equipment**, **Pending Orders**, **Active Rentals**, and **Gross Revenue**.
- **Inventory Management**:
  - **Add Equipment Form** (`/dashboard/provider/gear/new`): Inputs for gear title, brand, model, daily rate, pickup location, stock quantity, category dropdown, image URL, and description.
  - **Real-Time Availability Toggle Switch**: Interactive `ToggleRight` / `ToggleLeft` toggle switch to mark gear as **Active** or **Off-list**.
  - **Delete Equipment**: Confirmation workflow with instant SWR cache invalidation.
- **Order Management Table** (`/dashboard/provider/orders`):
  - View all incoming customer orders with customer details, rental dates, and order total.
  - Contextual Status Action Buttons:
    - **`PLACED`** → **"Confirm Order"** (Updates status to `CONFIRMED`).
    - **`CONFIRMED` / `PAID`** → **"Mark Picked Up"** (Updates status to `PICKED_UP` upon gear pickup).
    - **`PICKED_UP`** → **"Mark Returned"** (Updates status to `RETURNED` upon gear return).

---

###  4. Platform Admin Role
- **Platform Health Overview** (`/dashboard/admin`): System-wide stats covering Total Users (Providers vs Customers), Total Equipment Listings, Total Rental Orders, and Gross Platform Revenue.
- **User Moderation Table** (`/dashboard/admin/users`):
  - Data table listing all registered users with search bar (name/email) and role filters.
  - Interactive **"Suspend User" / "Activate Account"** toggle buttons (`PATCH /api/admin/users/:id`).
- **Catalog Moderation Table** (`/dashboard/admin/gear`): Inspects all equipment listings across all providers.
- **Order Monitoring Table** (`/dashboard/admin/orders`): Tracks all rental requests system-wide.

---

##  Rental Order Status Lifecycle & Badges

| Order Status | UI Badge Styling | Provider View / Action | Customer View / Action |
| :--- | :--- | :--- | :--- |
| **`PLACED`** | 🟡 **Yellow/Amber Badge** (`bg-amber-50 text-amber-800`) | Sees **"Confirm Order"** button. | Sees order placed / awaiting confirmation. |
| **`CONFIRMED`** | 🔵 **Blue Badge** (`bg-blue-50 text-blue-700`) | Sees confirmed order state. | Sees **"Pay Now"** button (redirects to Stripe). |
| **`PAID`** | 🟣 **Purple Badge** (`bg-purple-50 text-purple-700`) | Sees **"Mark Picked Up"** button. | Sees **"Awaiting Pickup"** status. |
| **`PICKED_UP`** | 🟢 **Green Badge** (`bg-emerald-50 text-emerald-700`) | Sees **"Mark Returned"** button. | Sees **"Active Rental"** badge (gear in hand). |
| **`RETURNED`** | ⚪ **Gray Badge** (`bg-slate-100 text-slate-600`) | Sees **"Returned & Completed"** status. | Sees **"Leave Review"** button. |
| **`CANCELLED`** | 🔴 **Red Badge** (`bg-rose-50 text-rose-700`) | Sees order cancelled. | Sees order cancelled. |

---

## Technical Stack & Project Architecture

```
frontend/
├── public/                     # Static assets & icons
├── src/
│   ├── app/                    # Next.js App Router Structure
│   │   ├── (auth)/             # Login & Register Pages (/login, /register)
│   │   ├── (public)/           # Public Catalog & Details Pages (/gear, /gear/[id])
│   │   ├── dashboard/          # Role-Based Dashboard Routes
│   │   │   ├── customer/       # Customer Orders & Payment History
│   │   │   ├── provider/       # Provider Workspace, Inventory & Orders
│   │   │   └── admin/          # Admin Stats, User Moderation & Catalog
│   │   ├── payment/            # Payment Outcome Routes (/payment/success, /payment/cancel)
│   │   ├── error.tsx           # Error Boundary Fallback
│   │   ├── loading.tsx         # Root Loading Spinner
│   │   ├── not-found.tsx       # Graceful 404 Fallback
│   │   ├── layout.tsx          # Root Layout & Font Providers
│   │   └── page.tsx            # Public Homepage
│   ├── components/             # Reusable UI Primitives & Feature Modules
│   │   ├── common/             # Navbar, Footer, PublicLayout
│   │   ├── modules/            # Auth, Gear, Rental & Review Components
│   │   └── ui/                 # Alert, Badge, Button, Card, Input Primitives
│   ├── hooks/                  # SWR Data Hooks (useAuth, useGear, useRentals, usePayment, useReview, useAdmin, useProvider)
│   ├── lib/                    # API Client, Cookie Helpers & Classnames Merger
│   ├── services/               # Centralized REST API Service Calls
│   ├── types/                  # TypeScript Interfaces & Enums
│   └── proxy.ts                # Next.js 16 Route Protection Guard
├── API_INTEGRATION.md          # Comprehensive REST API Endpoint Mapping
├── package.json
└── tsconfig.json
```

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm** or **yarn** or **pnpm**
- Running **GearUp Backend API** (`http://localhost:5000` or deployed URL)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/gearup-frontend.git
cd gearup-frontend
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Running Development Server
Launch the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
Verify TypeScript compilation and create production bundle:
```bash
npm run build
npm run start
```

---

## Admin Credentials for Evaluation

For evaluator testing and moderation review, use the pre-configured administrator credentials:

- **Admin Email**: `admin@gearup.com`
- **Admin Password**: `AdminPassword123!`

---

## Documentation & API Mapping

For full technical documentation on backend endpoint consumption, refer to the [API_INTEGRATION.md](file:///d:/Gearup/frontend/API_INTEGRATION.md) document.

