# App Router Migration Guide

## ✅ What Has Changed

This project has been successfully migrated from **Pages Router** to **Next.js App Router** with focus on:
- React Server Components (RSC)
- Improved performance and caching
- Better error handling and loading states
- Security improvements (API token hidden)
- Modern Next.js patterns

## 📁 New Directory Structure

```
app/
├── layout.js                 # Root layout (replaces _app.js + _document.js)
├── page.js                   # Home page (replaces pages/index.js)
├── error.js                  # Global error boundary
├── not-found.js              # 404 handler
├── loading.js                # Global loading state
├── api/
│   ├── movies/              # Movies API routes (for future use)
│   ├── tv/                  # TV API routes (for future use)
│   └── person/              # Person API routes (for future use)
├── movies/
│   ├── page.js              # Movies list
│   └── [movieId]/
│       ├── page.js          # Movie details
│       ├── loading.js       # Movie details loading state
│       └── error.js         # Movie details error boundary
├── tv/
│   ├── page.js              # TV shows list
│   └── [tvId]/
│       ├── page.js          # TV show details
│       └── ...
└── person/
    ├── page.js              # People list
    └── [personId]/
        └── page.js          # Person details

lib/
├── tmdbClient.js            # Server-only TMDB API client
└── utils.js                 # Shared utilities (client & server)

components/
├── Navigation.js            # Client component (navigation)
└── Footer.js                # Client component (footer)

.env.local                    # Environment variables (API keys hidden!)
```

## 🔐 Security Improvements

### Before (❌ UNSAFE)
```javascript
// constants.js - Token exposed in frontend!
export const TOKEN = "Bearer eyJhbGc..." // Anyone can see this!
```

### After (✅ SECURE)
```javascript
// .env.local (not committed to git)
TMDB_API_KEY=eyJhbGc...

// lib/tmdbClient.js (server-only)
const TMDB_API_KEY = process.env.TMDB_API_KEY;
// Only available on server, never sent to client!
```

## 🚀 Performance Improvements

### 1. **Server Components by Default**
- Data fetching happens on the server
- No JavaScript sent to client for data loading
- Reduces client-side bundle size

### 2. **Incremental Static Regeneration (ISR)**
```javascript
// Caches and revalidates data
export async function fetchFromTMDB(endpoint, options = {}) {
  return fetch(url, {
    next: {
      revalidate: 3600, // Revalidate every hour
    },
  });
}
```

### 3. **Image Optimization**
```javascript
<Image
  src={getTMDBImageUrl(poster_path)}
  width={500}
  height={750}
  priority={true}  // For above-the-fold images
  placeholder="blur"
/>
```

### 4. **Suspense & Streaming**
```javascript
export default function Page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <PopularMovies /> {/* Streams as it loads */}
      </Suspense>
    </>
  );
}
```

## 📝 Key Changes from Pages Router

### 1. **Layout Structure**
| Aspect | Pages Router | App Router |
|--------|-------------|-----------|
| Root layout | `_app.js` + `_document.js` | `app/layout.js` |
| Page | `pages/index.js` | `app/page.js` |
| Dynamic routes | `pages/[id].js` | `app/[id]/page.js` |
| Error handling | No built-in | `error.js` |
| Loading states | Manual | `loading.js` |

### 2. **Data Fetching**
```javascript
// Pages Router (client-side)
useEffect(() => {
  fetch('/api/movies')
    .then(res => res.json())
    .then(data => setMovies(data));
}, []);

// App Router (server-side)
async function MoviesList() {
  const data = await fetch(url, {
    next: { revalidate: 3600 }
  });
  return <MovieCard data={data} />;
}
```

### 3. **Navigation**
```javascript
// Pages Router
import { useRouter } from 'next/router';
const router = useRouter();
router.push('/movies');

// App Router (server components)
// Links work automatically with prefetching

// App Router (client components)
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/movies');
```

### 4. **Search and Query Params**
```javascript
// Pages Router
const router = useRouter();
const { movieId } = router.query;

// App Router
export default function Page({ params }) {
  const { movieId } = params;
}

// For search params
export default function Page({ searchParams }) {
  const page = searchParams.page || 1;
}
```

## 🔄 Environment Setup

### 1. Create `.env.local`
```bash
TMDB_API_KEY=your_key_here
TMDB_API_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_PROFILE_PATH=https://www.themoviedb.org/t/p/w440_and_h660_face
NEXT_PUBLIC_IMAGE_PATH=https://image.tmdb.org/t/p
```

### 2. Never commit `.env.local`
```bash
# .gitignore
.env.local
.env.*.local
```

## 🎯 Server Component Best Practices

### ✅ Use Server Components for:
- Data fetching
- Accessing databases
- Using API keys/secrets
- Large dependencies (that don't need interactivity)

```javascript
// Server component - Perfect for data fetching
async function MovieList() {
  const movies = await fetchFromTMDB('/discover/movie');
  return <MovieCard data={movies} />;
}
```

### ✅ Use Client Components for:
- User interactions (clicks, form input)
- Browser APIs (localStorage, geolocation)
- React hooks (useState, useEffect)
- Event listeners

```javascript
'use client';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };
  
  return <form onSubmit={handleSearch}>...</form>;
}
```

## ⚡ Incremental Migration Checklist

If migrating from Pages Router:

- [x] Create `app/` directory structure
- [x] Migrate pages to `app/page.js`
- [x] Update dynamic routes `[id]` → `app/[id]/page.js`
- [x] Move API routes to `app/api/`
- [x] Create `app/layout.js` with root layout
- [x] Add error boundaries (`error.js`)
- [x] Add loading states (`loading.js`)
- [x] Hide secrets in `.env.local`
- [x] Update Navigation to use `next/navigation`
- [x] Add Suspense boundaries for better UX
- [ ] Remove old `pages/` directory (once fully tested)
- [ ] Update deployment configuration

## 🚀 Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

## 🔗 Useful Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Static Generation & ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

## ⚠️ Important Notes

1. **API Key Security**: Never expose TMDB token to frontend. Use `.env.local` only.
2. **Old Pages Router**: The `pages/` directory still exists but is superseded by `app/`.
3. **Testing**: Test all routes before deploying.
4. **Environment Variables**: Add `.env.local` to `.gitignore` before committing.
