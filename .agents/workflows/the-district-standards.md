---
description: The District's dev standards
---

# 🏗️ The District: Development Standards

When developing, refactoring, or adding features to this project, adhere strictly to these core standards to ensure consistency, performance, and a modern aesthetic across the entire codebase.

## 1. Tech Stack & Architecture

- **Framework:** Next.js 15 (App Router).
- **Styling:** Tailwind CSS v4 for all styling.
- **Animations:** Framer Motion (use thoughtfully, do not over-animate—preserve a snappy user experience).
- **Language:** TypeScript (ensure strict typing where applicable).

## 2. Clean & Concise Code

- **Simplicity First:** Write minimal, modular code. Avoid over-engineering.
- **Tailwind Priority:** If a layout, effect, or responsive design can be achieved with simple Tailwind classes, prioritize that over writing custom CSS or complex JS logic.
- **DRY Principle:** Avoid redundancy. Extract reusable logic into hooks or utility functions, and extract repeated UI into sub-components.

## 3. Brand & Aesthetic

- **Color:** Use `#fece00` (Brand Color) for highlights, active states, and primary accents.
- **Vibe:** Aim for a modern, accessible, and clean look. Avoid overdoing the "luxury" aspect—keep it sleek, simple, and user-friendly.

## 4. Internationalization (i18n)

- **Library & Pattern:** We use `next-intl` to support multiple languages.
- **Implementation:** Never hardcode user-facing text into components or pages. Always use translation hooks (e.g., `useTranslations()`) so the application correctly respects language changes.

## 5. Documentation & Naming Conventions

- **English Only:** All code comments, variable names, branch names, and documentation must be strictly in English.
- **Minimal Comments:** Only leave short, essential comments that explain the "why" and "context" behind complex logic, rather than describing "what" the code does.

## 6. Communication Standards

- **Thai Summary Indicator:** At the end of every response, provide a brief summary in **Thai** (สรุปสั้นๆ). This allows for a quick review of the main points or actions taken.
