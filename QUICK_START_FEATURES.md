# Quick Start - Using New Features

## 🎬 Cast Carousel - Browse Actors

### Where to Find It
Any movie or TV show detail page:
- `/movies/550` - Browse Fight Club cast
- `/tv/1399` - Browse Breaking Bad cast
- Any other movie/show with cast data

### How to Use
1. **Navigate** to any movie/TV detail page
2. **Scroll to** "Cast" section
3. **See** 6 cast members displayed
4. **Click "Next"** to see more cast members
5. **Click on dots** to jump to specific pages
6. **Click any actor card** to view their profile

### Example URL
```
http://localhost:3000/movies/550
```

### What You Can Do
✅ Browse through all actors in a movie/show
✅ See actor name and character they played
✅ View actor profile photo
✅ Click to visit actor's detail page
✅ See actor's other movies/shows on their profile

---

## 📄 Pagination - Browse Large Result Sets

### Where to Find It
Any listing page at the bottom:
- `/movies` - Popular movies (has pagination)
- `/tv` - Popular TV shows (has pagination)
- `/person` - Trending people (has pagination)
- And all category pages...

### Browse Options

#### Movies Category
- `/movies` - All popular movies
- `/movies/now-playing?page=1` - Currently in theaters
- `/movies/upcoming?page=1` - Coming soon
- `/movies/top-rated?page=1` - Best rated movies

#### TV Shows Category
- `/tv` - All popular shows
- `/tv/airing-today?page=1` - Shows airing today
- `/tv/on-the-air?page=1` - Currently on air
- `/tv/top-rated?page=1` - Best rated shows

#### People Category
- `/person` - Trending actors/directors

### How to Use
1. **Navigate** to any listing page (e.g., `/movies`)
2. **View** 20 results on current page
3. **Scroll to bottom** for pagination controls
4. **Click page numbers** to jump to that page
5. **Click "Next"** to go to next page
6. **Click "Previous"** to go back
7. **See** which page you're on (Page X of Y)

### Example Navigation
```
Start at: http://localhost:3000/movies
↓ (page shows 20 movies)
↓ Click "Page 2" or "Next →"
↓ Goes to: http://localhost:3000/movies?page=2
↓ (page shows 20 different movies)
↓ Click "Page 1" or "← Previous"
↓ Back to first page
```

### Pagination Controls
- **← Previous** - Go to previous page (disabled on page 1)
- **Page Numbers** - Click to jump to specific page
- **...** - Ellipsis shows there are more pages
- **Next →** - Go to next page (disabled on last page)
- **Page X of Y** - Shows current position

---

## 🔗 Click-to-Explore Workflow

### Complete Exploration Flow
```
1. Visit Movie Detail Page
   ↓
2. Find "Cast" Section
   ↓
3. Browse Cast with Carousel (Previous/Next/Dots)
   ↓
4. Find Actor You're Interested In
   ↓
5. Click on Actor Card
   ↓
6. View Actor's Profile & Filmography
   ↓
7. See Movies/Shows They Appeared In
   ↓
8. Click on Movie/Show
   ↓
9. Back to Movie/TV Detail Page
   ↓
10. See Different Cast - Repeat! 🔄
```

### Example Journey
```
Movie: Fight Club (/movies/550)
  ↓ Browse cast carousel
  ↓ Find Brad Pitt
  ↓ Click on Brad Pitt card
  ↓ Go to Brad Pitt profile (/person/287)
  ↓ See "Known For" section (Ocean's Eleven, Troy, etc.)
  ↓ Click on Ocean's Eleven
  ↓ Go to Ocean's Eleven detail (/movies/115497)
  ↓ See different cast (George Clooney, etc.)
  ↓ Browse that cast carousel
  ↓ And so on...
```

---

## 📱 Mobile Experience

### Carousel on Mobile
- Shows 2-3 items instead of 6 (responsive)
- Touch-friendly Previous/Next buttons
- Dots pagination easy to tap
- Card image scales nicely

### Pagination on Mobile
- Buttons stack nicely
- Page numbers visible but compact
- Touch-friendly button sizing
- "Page X of Y" shows your position

---

## 🔍 Example URLs to Try

### Cast Carousel
```
http://localhost:3000/movies/550                    # Fight Club
http://localhost:3000/tv/1399                       # Breaking Bad
http://localhost:3000/movies/278                    # The Shawshank Redemption
http://localhost:3000/tv/1417                       # Game of Thrones
http://localhost:3000/movies/680                    # Pulp Fiction
```

### Pagination - Movies
```
http://localhost:3000/movies                        # Popular movies (page 1)
http://localhost:3000/movies?page=2                 # Page 2
http://localhost:3000/movies/now-playing            # Now playing (page 1)
http://localhost:3000/movies/now-playing?page=2     # Page 2
http://localhost:3000/movies/upcoming               # Upcoming (page 1)
http://localhost:3000/movies/top-rated              # Top rated (page 1)
```

### Pagination - TV Shows
```
http://localhost:3000/tv                            # Popular TV (page 1)
http://localhost:3000/tv?page=2                     # Page 2
http://localhost:3000/tv/airing-today               # Airing today
http://localhost:3000/tv/on-the-air                 # On the air
http://localhost:3000/tv/top-rated                  # Top rated shows
```

### Pagination - People
```
http://localhost:3000/person                        # Trending people (page 1)
http://localhost:3000/person?page=2                 # Page 2
```

---

## 💡 Pro Tips

### Finding Content
1. Browse by category (Movies/TV/People)
2. Use pagination to explore all results
3. Click on any item to see details
4. In detail page, browse cast carousel
5. Click cast member to explore their work

### Deep Exploration
- Each movie has multiple cast members
- Each cast member has multiple movies
- Each movie has recommendations
- Endless exploration possibilities!

### Performance
- Pagination uses URL parameters (?page=2)
- Carousel has smooth animations
- All pages load fast
- Mobile optimized

---

## ❓ FAQ

### Q: Why does pagination show "Page X of Y"?
**A:** This shows you're browsing millions of results. TMDB has ~1000 pages of popular movies!

### Q: How many cast members can I see?
**A:** Depends on the movie/show. Carousel shows 6 at a time, but you can see all of them by clicking through pages.

### Q: Can I search for specific movies?
**A:** Not yet! Currently browse by category. Search is a future enhancement.

### Q: How often is data updated?
**A:** TMDB API provides latest data. Cache refreshes every 24 hours by default.

### Q: On mobile, why do only 2 columns show?
**A:** Responsive design! Grid automatically adjusts for screen size.

### Q: Can I go to page 100+ directly?
**A:** Yes! Click the page number or modify the URL with ?page=100.

---

## 🎯 Typical Usage Sessions

### Session 1: Browse Popular Movies
```
1. Go to http://localhost:3000/movies
2. See popular movies
3. Browse through pages with pagination
4. Click on interesting movie
5. View full details and cast
6. Browse cast carousel
```

### Session 2: Find Actor's Work
```
1. Go to http://localhost:3000/movies/550
2. Browse cast in carousel
3. Find actor you like
4. Click on their card
5. View their profile (/person/287)
6. See their "Known For" section
7. Click on other movies they did
8. Repeat!
```

### Session 3: Explore TV Shows
```
1. Go to http://localhost:3000/tv
2. Browse popular shows with pagination
3. Find show you like
4. View details (/tv/1399)
5. Browse cast carousel
6. Click on any actor
7. Explore their other shows/movies
```

---

## 🚀 Getting Started Right Now

### Step 1: Start Dev Server
```bash
npm run dev
```

### Step 2: Open Browser
```
http://localhost:3000
```

### Step 3: Try Features
1. Click "Movies" in navigation
2. See pagination at bottom
3. Click page 2
4. Click on any movie
5. View cast carousel
6. Click on any actor
7. See their profile!

---

## 📚 Component Reference

### For Developers

**CastCarousel Component**
```javascript
import CastCarousel from '@/components/CastCarousel';

// Usage in your page
{cast.length > 0 && (
  <CastCarousel castMembers={cast} />
)}
```

**Pagination Component**
```javascript
import Pagination from '@/components/Pagination';

// Usage in your page
<Pagination 
  currentPage={page} 
  totalPages={totalPages} 
  baseUrl="/movies" 
/>
```

---

## ✨ Feature Highlights

✅ Browse 100+ cast members in any movie/show
✅ Click cast member → see their profile
✅ Pagination on all listing pages
✅ Smart page display (not all 1000 pages!)
✅ Mobile responsive design
✅ Smooth, fast navigation
✅ No page reloads
✅ Clean, intuitive UI

---

## 🎊 Enjoy!

Your MoviesInfo app is now fully interactive with cast carousels and pagination.
Start exploring movies, TV shows, and cast members!

Any questions? Check IMPLEMENTATION_DETAILS.md for technical info.
