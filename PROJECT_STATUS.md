# 🏆 THE DISTRICT - PROJECT STATUS

A high-level checklist of the Current State, Remaining Cleanup, and Crew Actions.

## ✅ FINISHED (Feature Complete)

- [x] **Contact Page Interactivity**: All contact items (Location, Phone, Email) are now fully clickable links with enhanced visual feedback.
- [x] **Luxury Glow Effects**: implemented a more pronounced brand glow effect (`drop-shadow-brand`) for all icons on hover.
- [x] **Localization Categorization**: Reorganized all contact-related strings into a dedicated `Contact` section in i18n JSONs (EN, TH, CN). Removed hardcoded labels.
- [x] **Booking Flow Refactoring**: Replaced duplicate buttons with a reusable `BookingButton` component; removed obsolete `BookingModal`.
- [x] **Dependency Cleanup**: Removed unused packages (`dayjs`, `flag-icons`, `react-day-picker`) from `package.json`.
- [x] **Navigation & Layout**: Header (Home/Story/Gallery/Blog/Contact) and Menu (Stay/Dine/Neighbourhood) updated.
- [x] **Header Refresh**: Logo refined with small "Hostel" text and premium glow effect.
- [x] **Gallery Redesign**: Masonry grid with room-specific stats (Beds, Wifi, Capacity).
- [x] **Blog Overhaul**: Single-tag filtering, SSG enabled, and request-level caching.
- [x] **Floating Messenger**: Direct Line/Messenger buttons with smooth entry/exit animations.
- [x] **Theme Change (Dark/Light)**: Dynamic theme switching with `next-themes` and animated sun/moon toggle; refined with "Plynn House" warm earth tones and dual-tone high-contrast borders.
- [x] **Theme-Aware Typography & UX**: All text, borders, and complex UI elements (including Home hero, Contact map, and Gallery navigation) now automatically adapt to the current theme for maximum readability and brand alignment.
- [x] **UX Polish**: Consistent `PageHeader` standard and premium transitions across all pages.
- [x] **Universal Theme Harmony**: Applied comprehensive "Plynn House" light/dark mode support across all core pages, including Gallery filtering, Contact maps, and Blog navigation.
- [x] **Mobile-First Carousels**: Transitioned static image lists on Stay and Dine pages to high-performance Swiper-based carousels for an ultra-premium mobile experience.
- [x] **Collapsible Navigation (Universal)**: Implemented a refined single-row "Command Bar" layout for Gallery and Blog. Navbars are now fully collapsible on all devices with a 100% stable, non-bouncing transition using absolute overlays on desktop.
- [x] **Responsive Image Integrity**: Standardized aspect ratios and object-fit properties across all masonry grids and carousels to ensure images are never compressed or distorted on mobile.
- [x] **Blog Hero Contrast**: Refined `AnimatedPostHeader` with consistent white text and dark gradient overlays to maintain readability on diverse imagery.
- [x] **UI Unit Consistency**: Synchronized backgrounds (`bg-soft`, `bg-surface`) across ComingSoon placeholders and functional pages for a seamless navigation experience.
- [x] **Theme Refactor**: Renamed core CSS variables (`card` -> `surface`, `muted` -> `soft`) for more semantic and maintainable naming across the application.
- [x] **Contact Social Polish**: Redesigned social icons with increased size (`w-8 h-8`), theme-aware default colors, and premium `globe.svg` branding.
- [x] **Gallery Nav Modernization**: Implemented 'Status Indicator' (yellow pill) and refined toggle for mobile; auto-closing behavior for smoother UX.
- [x] **Dynamic Scroll Positioning**: Precision landing (180px mobile / 140px desktop).
- [x] **Footer Interaction**: Added official phone number alongside inquiries; synced with branding constants and i18n.
- [x] **Gallery Performance Optimization**: Resolved mobile flickering by removing `whileInView` animations and simplifying image crossfades.
- [x] **Build Stabilization**: Fixed `globals.css` and dependency issues for a clean dev environment.
- [x] **Blog Pagination & Localisation**: Implemented "Showing X-Y of Z posts" summary with full translation support (EN, TH, CN).
- [x] **Hydration Guard Refinement**: Migrated to a modern `useIsClient` hook using `useSyncExternalStore`, resolving ESLint errors and improving hydration performance.
- [x] **Story Page Foundation**: Implemented theme-aware layout for the Story page with developer notes for future-proofing.

---

## 🛠 TECH CLEANUP & ACTIVE TASKS

### 🖼 Gallery & Visuals

- [ ] **Gallery Big Update**: Revert to image mosaic (randomized "vibe" show like Muu).
- [ ] **Modal Image Viewer**: On click image, open a modal to see full picture (with next/previous/zoom).
- [ ] **Image Descriptions**: Display specific image description on bottom right of the modal/image.
- [ ] **Gallery Vibe Logic**: Show other places than dorm and suite first (prioritize common areas/vibe).
- [ ] **Tick-based Transitions**: Implement image changing by time tick where applicable.

### 📱 Responsive & Layout

- [x] **Container Expansion**: Implement a larger `containerClass` for all pages to better utilize screen real estate (`max-w-screen-2xl`).
- [ ] **Modal Image Viewer**: On click image, open a modal to see full picture (with next/previous/zoom).
- [ ] **Gallery Big Update**: Revert to image mosaic (randomized "vibe" show like Muu).

### 🎨 Theme & Typography

- [x] **Light Mode Contrast**: Use darker gold and darker characters for high contrast in light theme.

### 🏨 Pages & Content

- [ ] **Stay Page Refactor**: Simplify "Stay" to only two pages, similar to the Gallery structure.
- [ ] **Dine Content**: Add Thai beers and other items (toggle OFF for legal reasons for now).
- [ ] **Home Page Re-design**: Implement new design once final contents/assets are ready.
- [ ] **Content Verification**: Confirm wording like "bunk bed", "เตียงสองชั้น", etc.
- [x] **Remove Linktree**: Cleanup obsolete linktree references.

### 🔍 SEO, Tracking & Bugs

- [ ] **Bug Investigation**: FB Messenger redirect issue on iOS mobile (opening new chats).
- [ ] **SEO & Visibility**: Final SEO score check (90+) and ensure Google Maps visibility for "hostel/hotel".
- [ ] **Analytics & Tracking**: Evaluate and implement tracking (Options: Vercel Tracking, Cookies, or UTM).
- [ ] **CMS**: No CMS for now (postponed until content volume increases).

---

## 👥 DISTRICT CREW (Actions for Them)

- [ ] **Content Creation**: Provide final copywriting for all pages; confirm important wording.
- [ ] **Asset Delivery**: Upload high-res photography (priority: non-room "vibe" shots for gallery).
- [ ] **Domain & Session**: Schedule a session to finalize domain and hosting setup.
- [ ] **Legal Review**: Confirm "Dine" legal requirements for beer/alcohol display.
