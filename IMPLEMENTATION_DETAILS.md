# Implementation Guide - Carousel & Pagination

## 📚 Component Implementations

### 1. CastCarousel Component

**Location**: `components/CastCarousel.js`

```javascript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getTMDBImageUrl } from '@/lib/utils';
import styles from '@/styles/Carousel.module.css';

export default function CastCarousel({ castMembers }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(castMembers.length / itemsPerPage);
  
  // Get current page items
  const displayedMembers = castMembers.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  // Navigation handlers
  const handlePrevious = () => {
    // Previous logic...
  };

  const handleNext = () => {
    // Next logic...
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index * itemsPerPage);
  };

  // Render cast cards wrapped in Links
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselGrid}>
        {displayedMembers.map((member) => (
          <Link href={`/person/${member.id}`}>
            {/* Cast card UI */}
          </Link>
        ))}
      </div>
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {/* Previous/Next buttons */}
          {/* Dot pagination */}
        </div>
      )}
    </div>
  );
}
```

**Key Features**:
- Client component with `'use client'` directive
- State management with `useState` for `currentIndex`
- Displays 6 items at a time by default
- Previous/Next navigation with bounds checking
- Dot pagination for quick jumping
- All items wrapped in Next.js `Link` to person pages

---

### 2. Pagination Component

**Location**: `components/Pagination.js`

```javascript
'use client';

import Link from 'next/link';
import styles from '@/styles/Pagination.module.css';

export default function Pagination({ currentPage, totalPages, baseUrl }) {
  // Smart page number calculation
  const pageNumbers = [];
  const maxPagesToShow = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Build page array
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link href={`${baseUrl}?page=${currentPage - 1}`} className={styles.button}>
          ← Previous
        </Link>
      )}

      {/* Page Numbers with ellipsis */}
      <div className={styles.pageNumbers}>
        {startPage > 1 && (
          <>
            <Link href={`${baseUrl}?page=1`}>1</Link>
            {startPage > 2 && <span>...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={page === currentPage ? styles.active : ''}
          >
            {page}
          </Link>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span>...</span>}
            <Link href={`${baseUrl}?page=${totalPages}`}>
              {totalPages}
            </Link>
          </>
        )}
      </div>

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link href={`${baseUrl}?page=${currentPage + 1}`} className={styles.button}>
          Next →
        </Link>
      )}

      {/* Info Text */}
      <div className={styles.info}>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
```

**Key Features**:
- Smart page number display (not all pages)
- Ellipsis (...) for large ranges
- Previous/Next as Links (no state needed)
- Active page styling
- Mobile responsive
- Stateless design (page from URL)

---

### 3. Integration in Detail Pages

**Example**: `app/movies/[movieId]/page.js`

```javascript
import CastCarousel from '@/components/CastCarousel';

async function MovieDetails({ movieId }) {
  const [movie, credits, keywords, recommendations] = await Promise.all([
    getMovieDetails(movieId),
    getMovieCredits(movieId),
    getMovieKeywords(movieId),
    getMovieRecommendations(movieId),
  ]);

  return (
    <div>
      {/* Movie info */}

      {/* CAST CAROUSEL - NEW */}
      {credits.cast?.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3>Cast</h3>
          <Suspense fallback={<div>Loading cast...</div>}>
            <CastCarousel castMembers={credits.cast} />
          </Suspense>
        </div>
      )}

      {/* Other sections */}
    </div>
  );
}
```

**Changes**:
- Import CastCarousel component
- Remove static grid rendering
- Wrap with Suspense for loading
- Pass entire `credits.cast` array
- CastCarousel handles pagination internally

---

### 4. Integration in Listing Pages

**Example**: `app/movies/page.js`

```javascript
import Pagination from '@/components/Pagination';

async function MoviesContent({ page = 1 }) {
  const moviesData = await discoverMovies({ page });
  const movies = moviesData.results || [];
  const totalPages = moviesData.total_pages || 1; // IMPORTANT: Extract totalPages

  return (
    <>
      {/* Movie grid */}
      <div style={{ display: 'grid', ... }}>
        {movies.map((movie) => (
          // Movie card
        ))}
      </div>

      {/* PAGINATION - NEW */}
      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/movies" />
    </>
  );
}

export default function MoviesPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1; // Get page from URL

  return (
    <div>
      <h1>Popular Movies</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MoviesContent page={page} />
      </Suspense>
    </div>
  );
}
```

**Changes**:
- Extract `totalPages` from API response
- Import Pagination component
- Pass `page`, `totalPages`, and `baseUrl` to Pagination
- Wrap content in fragment to add pagination below
- Page comes from `searchParams` query parameter

---

## 🎨 CSS Module Styling

### Carousel.module.css

```css
.carouselContainer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.carouselGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.navButton {
  padding: 8px 16px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.navButton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ddd;
  border: none;
  cursor: pointer;
}

.dot.active {
  background-color: #0066cc;
}
```

### Pagination.module.css

```css
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.button {
  padding: 10px 16px;
  background-color: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #0052a3;
}

.pageNumbers {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pageNumber {
  padding: 8px 12px;
  background-color: #f0f0f0;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #ddd;
}

.pageNumber:hover {
  background-color: #e0e0e0;
}

.pageNumber.active {
  background-color: #0066cc;
  color: white;
  border-color: #0066cc;
}

.info {
  font-size: 0.9rem;
  color: #666;
  white-space: nowrap;
}

@media (max-width: 768px) {
  /* Mobile optimizations */
  .pagination {
    gap: 8px;
  }

  .button {
    padding: 8px 12px;
    font-size: 0.85rem;
  }

  .pageNumber {
    padding: 6px 10px;
    font-size: 0.85rem;
  }
}
```

---

## 🔄 Data Flow Diagrams

### Cast Carousel Flow
```
Movie Detail Page
    ↓
fetch movieCredits(movieId)
    ↓
credits.cast (e.g., 50 actors)
    ↓
<CastCarousel castMembers={credits.cast} />
    ↓
Component state: currentIndex = 0
    ↓
Display items 0-5 (6 items per page)
    ↓
User clicks "Next" button
    ↓
currentIndex = 6
    ↓
Display items 6-11
    ↓
User clicks cast member
    ↓
Link href="/person/123"
    ↓
Navigate to person detail page
```

### Pagination Flow
```
Movies Listing Page
    ↓
Page extracted from URL ?page=2
    ↓
fetch discoverMovies({ page: 2 })
    ↓
API returns: results[], total_pages
    ↓
<Pagination currentPage={2} totalPages={50} />
    ↓
Component renders page numbers
    ↓
User clicks page 3
    ↓
Link href="/movies?page=3"
    ↓
URL updates, page changes
    ↓
MoviesPage gets new searchParams.page
    ↓
Refetch with new page
    ↓
Content updates
```

---

## 🧪 Testing the Features

### Test Cast Carousel
1. Navigate to `/movies/550` (Fight Club)
2. Scroll to Cast section
3. See first 6 cast members
4. Click "Next" button → see more cast
5. Click dot pagination → jump to page
6. Click any actor name → should go to `/person/[id]`
7. Test on mobile → should be responsive

### Test Pagination
1. Navigate to `/movies`
2. See movies with pagination at bottom
3. Click page 2 → URL becomes `/movies?page=2`
4. Content updates with page 2 results
5. Click "Next" → goes to page 3
6. Click page 1 → back to first page
7. Test "Previous" button
8. Test on mobile → buttons responsive

### Test All Variants
- `/movies/now-playing?page=2`
- `/movies/upcoming?page=2`
- `/movies/top-rated?page=2`
- `/tv?page=2`
- `/tv/airing-today?page=2`
- `/tv/on-the-air?page=2`
- `/tv/top-rated?page=2`
- `/person?page=2`

---

## 📊 Performance Considerations

### CastCarousel
- **State**: Minimal (just `currentIndex`)
- **Renders**: Only 6 cards at a time
- **Navigation**: O(1) - just updates index
- **No re-fetching**: All data loaded from parent

### Pagination
- **Stateless**: No component state
- **Links**: Client-side navigation via Next.js Link
- **Preloading**: Next.js automatically prefetches linked pages
- **No API waste**: Only requested page fetched

---

## 🚀 Future Enhancements

1. **Carousel Auto-Play**: Add timer for auto-advance
2. **Keyboard Navigation**: Arrow keys for carousel
3. **Infinite Scroll**: Instead of pagination
4. **Filters**: Filter cast by role, sort options
5. **Bookmarking**: Save favorite cast/actors
6. **Analytics**: Track most-viewed cast members
7. **Related Content**: Show other movies with same actor

---

## 📝 Code Quality

✅ **Server Components**: Used for data fetching
✅ **Client Components**: Used only for interactivity
✅ **Suspense Boundaries**: Proper loading states
✅ **Error Handling**: Fallbacks for missing data
✅ **Accessibility**: Proper Link semantics, ARIA labels
✅ **Mobile Responsive**: CSS media queries
✅ **CSS Modules**: Scoped, no global pollution
✅ **Performance**: Minimal re-renders, efficient state

---

## 🎓 Learning Points

- How to build interactive carousel components in React
- Implementing pagination with URL parameters
- Proper Next.js Link usage for navigation
- Client vs Server Component patterns
- CSS Modules for styling
- Suspense for async data loading
- State management with hooks

This implementation demonstrates modern React and Next.js best practices!
