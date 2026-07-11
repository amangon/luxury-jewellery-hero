# Aurélie — Luxury Jewellery E-Commerce (MERN)

A full-stack luxury jewellery storefront: React (Vite) + Tailwind + Framer Motion frontend,
Node/Express + MongoDB backend, JWT auth with role-based access, Cloudinary image uploads,
cart/wishlist/checkout, and a complete admin dashboard. The homepage is fully live — every
catalogue section (categories, featured pieces, best sellers, new arrivals) is fetched from
the API with loading skeletons, error states, and empty states.

## Project Structure

```
hero-section-project/          # Frontend (Vite + React)
├── src/
│   ├── api/
│   │   └── axios.js            # Axios instance, auth token interceptor, error helper
│   ├── context/
│   │   ├── AuthContext.jsx     # Login/register/logout, current user, persisted JWT
│   │   ├── CartContext.jsx     # Cart state, persisted to localStorage
│   │   └── WishlistContext.jsx # Wishlist state, synced with backend
│   ├── routes/
│   │   ├── ProtectedRoute.jsx  # Requires authentication
│   │   └── AdminRoute.jsx      # Requires authentication + admin role
│   ├── components/
│   │   ├── navbar/, footer/, hero/, banner/, newsletter/,
│   │   │   testimonials/, instagram/, why-choose-us/   # Original homepage sections
│   │   ├── categories/         # ShopByCategory + CategoryCard (live API data)
│   │   ├── collections/        # FeaturedCollections + FeaturedProductCard (live API data)
│   │   ├── products/           # BestSellers, NewArrivals, ShopProductCard (live API data)
│   │   ├── layout/              # MainLayout (storefront), AdminLayout (dashboard sidebar)
│   │   ├── admin/                # StatCard and other admin-only building blocks
│   │   └── common/               # Loader, Skeleton, SectionState, EmptyState, FormInput,
│   │                              # Pagination, StarRating, AccountSidebar, Logo
│   ├── pages/                    # Shop, ProductDetails, Cart, Checkout, Orders,
│   │                              # OrderDetails, Wishlist, Login, Register, Profile,
│   │                              # EditProfile, ChangePassword, NotFound, Home
│   ├── pages/admin/               # Dashboard, Analytics, AdminProducts, ProductForm,
│   │                              # AdminCategories, AdminOrders, AdminUsers, AdminSettings
│   ├── data/content.js            # Remaining editorial-only content (trust features,
│   │                              # testimonials, Instagram gallery) — not catalogue data
│   ├── App.jsx                    # Route tree
│   └── main.jsx                   # Providers (Router, Auth, Cart, Wishlist) + Toaster
└── .env.example

backend/                        # Backend (Node/Express + MongoDB)
├── config/                      # db.js (Mongo connection), cloudinary.js (upload_stream)
├── models/                      # User, Product, Category, Order
├── controllers/                 # auth, user, product, category, order, dashboard
├── routes/                      # auth, user, product, category, order, dashboard
├── middleware/                  # auth (protect/authorize), upload (multer), validate
│                                # (express-validator rules), errorHandler, asyncHandler
├── utils/                       # apiFeatures (search/filter/sort/paginate), ErrorResponse,
│                                # sendTokenResponse, seed.js
├── server.js
└── .env.example

README.md
```

## What's implemented

**Frontend**
- Auth: Register, Login, Logout, protected routes, admin-only routes
- **Homepage — fully live**: Hero and the promo banner are editorial/marketing copy with no
  catalogue data, so they stay as designed; every other section is fetched from the API:
  - Shop by Category → `GET /api/categories`
  - Featured Collection → `GET /api/products/featured`
  - Best Sellers → `GET /api/products/best-sellers`
  - New Arrivals → `GET /api/products/new-arrivals`
  - Each of these renders a skeleton grid while loading, an inline retry prompt on error,
    and a friendly empty state if the admin hasn't added data yet.
- Shop: search, category/price filters, sort, pagination
- Product details: gallery, reviews, related products, add to cart/wishlist
- Cart (persisted in localStorage) → Checkout → Orders → Order details (with cancel)
- Wishlist (synced with backend)
- Profile: overview, edit profile (with avatar upload), change password
- Admin dashboard: summary stats, sales analytics, product CRUD (multi-image upload,
  stock, featured/best-seller/new-arrival flags), category CRUD, order management
  (status updates), user management (role/active toggles), admin settings

**Backend**
- Models: User, Product, Category, Order (with reviews, addresses, wishlist embedded)
- JWT auth with httpOnly cookie + Bearer token support, bcrypt password hashing
- Role-based middleware (`protect`, `authorize`)
- Multer (memoryStorage) → Cloudinary `upload_stream` for all image uploads
- Centralized error handling, express-validator input validation, rate limiting, helmet, CORS
- Full REST API: auth, users (profile/addresses/wishlist/admin user mgmt),
  products (CRUD, search/filter/sort/paginate, reviews, stock), categories, orders
  (place/cancel/status), dashboard (summary + sales analytics)

## Verification performed

- `npm install` and `npm run build` succeed cleanly on the frontend (no errors/warnings).
- `npm install` succeeds on the backend; the server boots cleanly with no missing/unresolved
  imports (every named controller/middleware/util import was confirmed to resolve).
- Smoke-tested the running backend over HTTP: `/api/health` returns 200, validation
  middleware correctly rejects malformed input with descriptive messages, and protected/DB
  routes correctly reach Mongoose (verified end-to-end request handling through routing →
  middleware → controller → error handler).
- Removed the unused static `ProductCard`/`CollectionCard` components and the demo arrays
  they depended on (`COLLECTIONS`, `CATEGORIES`, `BEST_SELLERS`, `NEW_ARRIVALS`) after
  wiring their replacements to live data, so there's no dead code left behind.
- Confirmed no stray `console.log` debug statements in the frontend; the only backend
  `console.log` calls are intentional startup/seed logging.

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, Cloudinary keys
npm install
npm run seed             # creates an admin user + starter categories
npm run dev               # http://localhost:5000
```

Default seeded admin login (change `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` before seeding):
`admin@luxuryjewellery.com` / `ChangeMe123!`

> The homepage sections will show their empty state until you add categories and mark some
> products as featured / best seller / new arrival from the admin dashboard.

### 2. Frontend

```bash
cd hero-section-project
cp .env.example .env    # set VITE_API_URL if not http://localhost:5000/api
npm install
npm run dev               # http://localhost:5173
```

## Deployment

**Backend → Render**
1. New Web Service, root directory `backend`, build command `npm install`, start command `npm start`.
2. Add all variables from `.env.example` in the Render dashboard (use your real MongoDB Atlas URI,
   a strong `JWT_SECRET`, your Cloudinary credentials, and set `CLIENT_URL` to your deployed
   frontend URL).

**Frontend → Vercel**
1. New Project, root directory `hero-section-project`, framework preset Vite.
2. Add `VITE_API_URL` pointing at your deployed Render backend, e.g. `https://your-api.onrender.com/api`.

**Database → MongoDB Atlas**
1. Create a free cluster, add a database user, allow network access from `0.0.0.0/0` (or Render's
   IPs), and copy the connection string into `MONGO_URI`.

## Notes

- Product/category images are uploaded straight to Cloudinary from memory (no disk writes),
  so this works out of the box on ephemeral hosts like Render.
- Stock is decremented atomically per order item at checkout and restored on cancellation.
- All admin routes are protected both client-side (`AdminRoute`) and server-side
  (`protect` + `authorize("admin")` middleware) — the frontend guard is a UX convenience only.
- The footer's "Categories" quick-links route to the general Shop page rather than a specific
  category ID, since the footer has no live category context; use the homepage's "Shop by
  Category" section (or the Shop page's own category filter) for pre-filtered links.
