## 🏥 HealthApp - Frontend Implementation

This is a frontend implementation for the **HealthApp** based on the design specifications and requirements outlined in the technical assignment. The application simulates a health-tracking interface, built using **React 19** and **Vite**.

---

## 🖌️ Design Resource

- **Figma**:  
  [🔗 HealthApp Design File](https://www.figma.com/file/7qqT3dvv5OagaRlUFK01vB/HealthApp_1203)

## 📁 Project Structure

src/
├── assets/ # Static assets
├── components/ # Reusable UI components
├── pages/ # TopPage, MyRecord, ColumnPage
├── routes/ # Routing configuration
├── services/ # API calls (genre.ts, comic.ts, etc.)
├── hooks/ # Custom hooks (useFetch, usePost, etc.)
├── stores/ # Zustand store (if used)
├── utils/ # Utility functions
├── interfaces/ # Common and Specific Interfaces
├── helpers/ # Helper functions and utilities (icons, etc.)
├── App.tsx
└── main.tsx

### 📂 Helpers Directory

The `helpers/` directory contains utility functions and shared resources that support the application:

- **`icons.tsx`** - Contains SVG icon definitions and icon-related utilities
  - `svgSources` - Object containing React SVG elements for custom icons
  - Used by components that need custom SVG icons (e.g., knife icon for meal tracking)

## Run Source Code

🧪 Run Locally

```
npm run dev
```

🔧 Build for Production

```
npm run build
```

## 📁 Component Folder Structure Convention

- Each screen or top-level component (e.g. Homepage, Dashboard, Profile) must be placed in a dedicated folder.
- That folder must contain at least:
  - `ComponentName.page.tsx` – main component file (layout + render).
  - `ComponentName.state.ts` – state, hooks, logic.
  - `ComponentName.styles.ts` – optional styles using MUI's `sx` prop for styling.
  - `index.tsx` – re-export file page using `export default Component`.

✅ Example structure:

---

## 📦 File Naming Rules

| File                     | Responsibility                                 |
| ------------------------ | ---------------------------------------------- |
| `Component.page.tsx`     | Top-level layout and structure.                |
| `Component.state.ts`     | Hooks, Zustand, local state logic.             |
| `Component.styles.ts`    | Tailwind variants or styled logic if needed.   |
| `SubComponent.tsx`       | Reusable child logic/UI block.                 |
| `SubComponent.state.ts`  | Logic specifically for the subcomponent.       |
| `SubComponent.styles.ts` | Styles for the subcomponent.                   |
| `index.tsx`              | Barrel file to `export default` the main page. |

> All subcomponents should be colocated in folders when they grow in complexity (form, card, list, section, etc.).

---

## ⚙️ Code Implementation Guidelines

- ✅ Follow **Atomic Design** principles: Organisms > Molecules > Atoms.
- ✅ Prefer **early returns** in components and handlers.
- ✅ Use **TailwindCSS only** for all styling; no external CSS files.
- ✅ Use `class:` directive instead of ternaries for conditional class logic.
- ✅ Use **descriptive** and **semantic** names for variables, components, and handlers.
- ✅ Use `handlePrefix` for all event handlers (`handleClick`, `handleSubmit`, etc.).
- ✅ Use `const` instead of `function` declarations.
- ✅ Separate data-fetching/state logic (`.state.ts`) from UI (`.tsx`).
- ✅ All components must be **accessible**: include `tabIndex`, `aria-label`, `onClick`, and `onKeyDown` as needed.

---

## 🧱 Barrel File Rule

Every component folder must contain an `index.tsx`:

```ts
import Homepage from "./Homepage.page";
export default Homepage;
```

## 🧭 Routing Architecture Guidelines (React Router v6.9+)

- Use `useRoutes()` for all route definitions; avoid `<Route>` tree manually in JSX.
- Use `lazy()` + `Loadable()` wrapper for lazy-loading route components.
- Nest routes under layout containers (e.g., `AuthLayout`, `MainLayout`) using `children` property.
- Use `Navigate` with `replace` to handle redirects and fallback routing.
- Use route guards (`AuthGuard`, `GuestGuard`) to protect pages by nesting under `element`.
- Define error pages (`401`, `403`, `404`, `500`) as direct routes.
- Use `Component: X` (not `element`) for top-level route components to enable automatic code-splitting.
- Group features under folders with semantic URLs:
  - Example: `/genres/list`, `/genres/new`, `/genres/detail/:id`

## 🔁 TanStack Query Convention

- All TanStack Query hooks must be declared in **`/libs/react-query/reactQuery.ts`**
- The file must contain:

  - `useFetch` – Generic `useQuery`
  - `usePrefetch` – Prefetch with `queryClient`
  - `useReactMutation` – General mutation
  - `usePost` – POST wrapper
  - `useUpdate` – PUT/PATCH wrapper
  - `useDelete` – DELETE wrapper

- These hooks must be imported in `/services/*.ts` and never duplicated in pages.
- Each hook must provide type-safety and allow override of `onSuccess`, `onError`, etc.
- Pages should only call service-layer hooks, never use raw `useQuery` or `useMutation`.

✅ Example `/services/genre.ts`:

```ts
import { useFetch, usePost } from "@/libs/react-query/reactQuery";
import { genreApi } from "@/apis";

export const useGenres = () =>
  useFetch({
    queryKey: ["genres"],
    queryFn: genreApi.getList,
  });

export const useCreateGenre = () =>
  usePost(genreApi.create, {
    onSuccess: () => toast.success("Genre created"),
  });
```

## 📚 Dependencies & Libraries

This project uses the following key dependencies and libraries:

### Core Framework

- **React 19** - Main UI framework
- **Vite** - Build tool and development server
- **TypeScript** - Type safety and development experience

### UI & Styling

- **Material-UI (MUI)** - Component library and design system
- **@emotion/react & @emotion/styled** - CSS-in-JS styling solution
- **Iconify** - Icon library providing access to 100,000+ open source icons

### State Management & Data Fetching

- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API calls

### Data Visualization

- **Recharts** - Composable charting library built on React components

### Routing

- **React Router DOM** - Client-side routing

### Development Tools

- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

---

## Commit Message Convention

We follow the conventional commit format to make it easy to understand the purpose of each commit. Below are the commonly used commit types:

- **feat**: Adds a new feature to the system.
- **fix**: Fixes a bug or patches an issue in the codebase.
- **refactor**: Refactors the code (no functional changes, may also fix bugs by improving the code structure).
- **docs**: Adds or modifies documentation.
- **chore**: Minor changes that don’t involve code functionality (e.g., updates to the build process, project configurations, etc.).
- **style**: Changes that do not affect the meaning of the code (e.g., formatting, CSS/UI).
- **perf**: Code improvements that enhance performance.
- **vendor**: Updates versions of dependencies or packages.
