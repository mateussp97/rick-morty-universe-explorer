# Rick & Morty Universe Explorer 🛸

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://rick-morty-universe-explorer.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC)](https://tailwindcss.com/)

A modern, responsive web application for exploring the Rick and Morty universe. Search and discover characters, locations, and episodes with a beautiful, intuitive interface.

## 🚀 Live Demo

**[View Live Application →](https://rick-morty-universe-explorer.vercel.app/)**

Experience the app in action at [https://rick-morty-universe-explorer.vercel.app/](https://rick-morty-universe-explorer.vercel.app/)

## 🎥 Demo Video

<video controls>
  <source src="./public/demo.mp4" type="video/mp4">
</video>

## ✨ Features

- **Multi-Entity Search**: Search across characters, locations, and episodes
- **Real-time Autocomplete**: Fast, debounced search with instant suggestions
- **Detailed Information Views**:
  - Characters: Status, species, origin, episodes
  - Locations: Type, dimension, residents
  - Episodes: Air date, featured characters
- **Keyboard Navigation**: Full support for arrow keys and shortcuts
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful UI**: Modern, clean interface with smooth animations

## 🛠️ Tech Stack & Architecture Decisions

### Core Technologies

#### **Next.js 16 (App Router)**

- **Why**: Server-side rendering for better SEO and performance
- **App Router Benefits**:
  - Simplified data fetching with React Server Components
  - Better code splitting and lazy loading
  - Built-in layouts and error boundaries

#### **TypeScript**

- **Why**: Type safety catches bugs at compile time
- **Benefits**:
  - Better developer experience with IDE autocomplete
  - Self-documenting code through interfaces
  - Easier refactoring and maintenance

#### **React Query (TanStack Query)**

- **Why**: Powerful data synchronization for GraphQL
- **Benefits**:
  - Automatic caching and background refetching
  - Built-in loading and error states
  - Optimistic updates and mutations
  - Reduces boilerplate vs traditional data fetching

### UI/UX Libraries

#### **shadcn/ui**

- **Why**: High-quality, accessible components that you own
- **Benefits**:
  - Copy-paste components (not a dependency)
  - Built on Radix UI for accessibility
  - Fully customizable with Tailwind
  - Consistent design system

#### **Tailwind CSS**

- **Why**: Utility-first CSS for rapid development
- **Benefits**:
  - No CSS naming conflicts
  - Consistent spacing and design tokens
  - Smaller production bundles with PurgeCSS
  - Responsive design made easy

### Data Layer

#### **GraphQL with graphql-request**

- **Why**: Type-safe API queries with exactly the data we need
- **Benefits**:
  - Single request for related data
  - Strong typing with TypeScript
  - Efficient data fetching (no over/under-fetching)
  - Self-documenting API

### Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page with tabs
│   └── providers.tsx      # React Query provider
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── entity-search.tsx  # Generic search component
│   ├── character-details.tsx
│   ├── location-details.tsx
│   └── episode-details.tsx
└── lib/
    ├── graphql-client.ts  # GraphQL client setup
    ├── queries.ts         # GraphQL queries & types
    └── utils.ts           # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/rick-morty-universe-explorer.git
cd rick-morty-universe-explorer
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Architecture Highlights

### Generic Component Design

The `EntitySearch` component is built to handle all entity types (characters, locations, episodes) through a single, reusable interface. This demonstrates:

- **DRY Principle**: One component, multiple uses
- **Type Safety**: Discriminated unions ensure type correctness
- **Scalability**: Easy to add new entity types

### Performance Optimizations

- **Debounced Search**: 300ms delay prevents excessive API calls
- **React Query Caching**: Previous searches are instant
- **Lazy Loading**: Components load only when needed
- **Optimized Re-renders**: Proper state management prevents unnecessary updates

### Accessibility Features

- Full keyboard navigation support
- ARIA labels for screen readers
- Semantic HTML structure
- Focus management for better UX

## 📸 Screenshots

### Character Search

<video controls>
  <source src="./public/details-character.mp4" type="video/mp4">
</video>

### Location Details

<video controls>
  <source src="./public/details-location.mp4" type="video/mp4">
</video>

### Episode View

<video controls>
  <source src="./public/details-episode.mp4" type="video/mp4">
</video>

## 📦 Building for Production

```bash
pnpm build
pnpm start
```

## 🚀 Deployment

This project is deployed on [Vercel](https://vercel.com/). You can deploy your own version:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Frick-morty-universe-explorer)

Or deploy manually:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with default Next.js settings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Rick and Morty API](https://rickandmortyapi.com/) for the excellent GraphQL API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vercel](https://vercel.com/) for hosting and deployment

## 🚨 Known Issues

- Search requires minimum 2 characters (API limitation)
- Some characters may have limited episode data

---

Built with ❤️ by [Mateus Paula](https://mateuspaula.dev/)
