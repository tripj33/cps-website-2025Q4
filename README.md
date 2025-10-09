# Astro + React Component Library

A modern component library built with Astro, React, Tailwind CSS, and Storybook. Features a collection of accessible, customizable UI components and marketing sections.

## 🚀 Tech Stack

- **[Astro](https://astro.build)** - Modern static site builder
- **[React](https://react.dev)** - UI component framework
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com)** - Accessible component primitives
- **[Storybook](https://storybook.js.org)** - Component documentation and testing
- **[Vitest](https://vitest.dev)** - Unit testing framework

## 📦 Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── ui/         # Core UI components (Button, Card, etc.)
│   │   ├── banners/    # Banner components
│   │   ├── buttons/    # Button variants
│   │   ├── cta/        # Call-to-action sections
│   │   ├── features/   # Feature sections
│   │   ├── footers/    # Footer components
│   │   ├── heros/      # Hero sections
│   │   ├── logos/      # Logo displays
│   │   ├── sections/   # General sections
│   │   ├── stats/      # Statistics displays
│   │   ├── testimonials/ # Testimonial components
│   │   └── timelines/  # Timeline components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Astro pages
│   ├── styles/         # Global styles
│   ├── stories/        # Storybook stories
│   ├── data/           # Static data
│   ├── lib/            # Utility functions
│   └── assets/         # Images and media
├── .storybook/         # Storybook configuration
└── package.json
```

## 🎨 UI Components

Core components powered by Radix UI and styled with Tailwind CSS:

- **Accordion** - Collapsible content sections
- **Avatar** - User profile images with fallback
- **Avatar Stack** - Grouped avatar display
- **Badge** - Status indicators and labels
- **Breadcrumb** - Navigation trails
- **Button** - Interactive buttons with variants
- **Card** - Container component for content
- **Carousel** - Image/content sliders with Embla
- **Context Menu** - Right-click menus
- **Navigation Menu** - Dropdown navigation
- **Separator** - Visual dividers
- **Sheet** - Side panels and drawers
- **Toggle** - Binary state switches
- **Toggle Group** - Grouped toggle controls

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Getting Started


Install dependencies:

```bash
pnpm install
# or
npm install
```

Start the development server:

```bash
pnpm dev
# or
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Available Scripts

- `pnpm dev` - Start Astro dev server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm storybook` - Start Storybook dev server
- `pnpm build-storybook` - Build Storybook for deployment

## 📚 Storybook

This project includes Storybook for component development and documentation.

Start Storybook:

```bash
pnpm storybook
```

Visit `http://localhost:6006` to browse the component library.

## 🎯 Features

- ✅ **Component Library** - Reusable UI components
- ✅ **Tailwind CSS v4** - Modern utility-first styling
- ✅ **React Integration** - Interactive components
- ✅ **Radix UI Primitives** - Accessible by default
- ✅ **Storybook** - Component documentation
- ✅ **TypeScript** - Type-safe development
- ✅ **Path Aliases** - Clean imports with `@` prefix
- ✅ **Vitest** - Unit and browser testing
- ✅ **Framer Motion** - Smooth animations

## 📝 Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import Button from '@/components/ui/button';
import Layout from '@layouts/Layout.astro';
import { data } from '@data/content';
```

## 🧪 Testing

Run tests with Vitest:

```bash
pnpm test
# or
npm test
```

## 📖 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [Storybook Documentation](https://storybook.js.org/docs)

## 📄 License

This project is open source and available under the MIT License.
