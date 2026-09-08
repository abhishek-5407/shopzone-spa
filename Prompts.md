# AI Audit & Prompt Engineering Log — ShopZone SPA

## Executive Summary
This document serves as the mandatory corporate audit file (`Prompts.md`) for the **ShopZone Single Page Application (SPA)** engineering sprint. In compliance with the corporate "Learn, Don't Copy" AI policy, this document records the architectural pair-programming prompts, design decisions, state management strategies, and debugging logs utilized during the development lifecycle.

---

## 1. Architectural Design & Setup Session

### Prompt 01: Client-Side Routing Architecture & Navigation Integrity
> **User Inquiry:** How do we structure a multi-route React Single Page Application using `react-router-dom` v7 without causing browser reloads or losing React state?
>
> **Pair-Programming Guidance & Implementation:**
> - Installed `react-router-dom` v7.
> - Formulated static routes (`/`, `/shop`, `/contact`, `/cart`, `/login`) and dynamic routes (`/product/:id`).
> - Strict rule: Standard `<a href="...">` anchor tags cause browser hard refreshes, destroying React memory state and clearing unpersisted shopping carts. Replaced all internal navigation elements with `<Link to="...">` and `<NavLink to="...">`.
> - Added `vercel.json` rewrite configuration (`"source": "/(.*)", "destination": "/"`) to resolve Vercel production server deep-link 404 refresh errors.

---

## 2. Global State Management (Cart & Auth Contexts)

### Prompt 02: Avoiding Prop-Drilling with Context API & LocalStorage Persistence
> **User Inquiry:** How do we manage global cart items and guest authentication across deeply nested routes without using Redux or experiencing data loss on hard browser refreshes?
>
> **Pair-Programming Guidance & Implementation:**
> - Created `CartContext.jsx` with actions: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`.
> - Duplicate item prevention logic: When dispatched, check if `item.id` exists in state array. If `true`, increment item quantity; if `false`, append payload with `quantity: 1`.
> - LocalStorage Synchronization: Loaded initial state via lazy initializer (`localStorage.getItem('shopzone_cart')`) and synchronized state updates via `useEffect`.
> - Created `AuthContext.jsx` with `loginAsGuest`, `loginWithCredentials`, and `logout` actions synced to `localStorage.getItem('shopzone_user')`.

---

## 3. Protected Route Security Pattern

### Prompt 03: Intercepting Unauthorized Access to `/checkout`
> **User Inquiry:** How do we prevent guest users from accessing the checkout flow before logging in?
>
> **Pair-Programming Guidance & Implementation:**
> - Implemented `ProtectedRoute.jsx` component inspecting `isAuthenticated` from `AuthContext`.
> - If unauthenticated, uses `<Navigate to="/login" state={{ from: location }} replace />` to capture original intended destination.
> - Post-login handling: Login screen reads `location.state?.from?.pathname || '/checkout'` and seamlessly redirects the user back to checkout upon authentication.

---

## 4. UI/UX Design System & Lighthouse Optimization

### Prompt 04: Commercial Grade Aesthetics & Accessibility
> **User Inquiry:** How do we ensure the design feels premium, modern, and human-crafted with high performance metrics?
>
> **Pair-Programming Guidance & Implementation:**
> - Created custom CSS tokens for colors (Slate, Emerald, Indigo, Amber), glassmorphism effects, shadows, card elevation, and smooth transitions.
> - Implemented skeleton loading states for API fetch delays (`https://dummyjson.com/products`).
> - Incorporated interactive toast notifications when items are added to cart.
> - Ensured responsive mobile menu, accessible form inputs, clean semantic HTML5 markup, and responsive grid layouts.

---

## 5. Engineering Sync & Deliverables Verification Checklist

- [x] **Mandatory Action Item:** 1-on-1 Sync scheduled with Mr. Nakul (8851407750).
- [x] **Base Routing (P0):** `/`, `/shop`, `/product/:id`, `/contact` routes functional.
- [x] **Global State (P1):** `CartContext` & persistent Navbar badge live update.
- [x] **Auth & Security (P2):** `AuthContext`, guest login, persistent state, `ProtectedRoute` for `/checkout`.
- [x] **Vercel Config:** `vercel.json` SPA rewrite rules enabled.
- [x] **QA Video Readiness:** Dynamic browser URL changes verified without browser page reloads.
