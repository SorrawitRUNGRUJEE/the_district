# The District Hostel Ekkamai

Welcome to the official repository for **The District Hostel Ekkamai** – the god, da best, inwza hostel in Bangkok, Thailand!

## 🌟 Project Overview

This project is built purely as a **frontend web application** (no backend architecture) using [Next.js](https://nextjs.org). It serves as both the main hostel website and a fully-functional blog system.

### Key Features

- **Hostel Website**: Showcases accommodations, photo gallery, location details, and directs users to our booking engine.
- **Markdown-Based Blog**: A built-in blog powered by Markdown files (`.md`/`.mdx`) for easy content management and formatting.
- **Multi-Language Support**: Fully configured with `next-intl` to allow users to switch languages and cater to guests from around the world.
- **Signature Theme**: The UI is designed around our "District Yellow" theme defined in `globals.css`:
  - Brand Base: `#fece00`
  - Brand Light: `#ffde4d`
  - Brand Dark: `#cbab27`

---

## 🚀 Getting Started

We use **pnpm** as our package manager. If you don't have it installed, you can get it via `npm install -g pnpm`.

### Installation

First, install the project dependencies:

```bash
pnpm install
```

### Development Server

Run the development server locally:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx` or other components. The page auto-updates as you edit the files.

---

## 🛠️ Scripts & Maintenance

Here are the primary scripts you will use during development and deployment:

- **`pnpm dev`**: Starts the local development server.
- **`pnpm start-dev`**: A convenience script that installs dependencies, opens the browser to `localhost:3000`, and starts the dev server.
- **`pnpm build`**: Builds the Next.js application for production.
- **`pnpm start`**: Starts the production server using the compiled build.
- **`pnpm lint`**: Runs ESLint to catch syntax and styling issues in the codebase.

---

## 🌐 Deployment

The easiest way to deploy this Next.js frontend is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js. Simply link the GitHub repository, and Vercel will handle the build and deployment process automatically.
