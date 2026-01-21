# Testing Checklist - App Router Migration

## ✅ Pre-Deployment Testing

### 1️⃣ Environment Setup
- [ ] `.env.local` file exists in project root
- [ ] TMDB_API_KEY is valid and not expired
- [ ] All environment variables are set:
  - [ ] `TMDB_API_KEY`
  - [ ] `TMDB_API_BASE_URL`
  - [ ] `NEXT_PUBLIC_PROFILE_PATH`
  - [ ] `NEXT_PUBLIC_IMAGE_PATH`
- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.local` is NOT committed to git

### 2️⃣ Startup & Build
- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts successfully
- [ ] No build errors in console
- [ ] Server starts on `http://localhost:3000`
- [ ] No deprecation warnings
- [ ] `npm run build` completes successfully
- [ ] Production build has no errors

### 3️⃣ Home Page (`/`)
- [ ] Page loads without errors
- [ ] "Welcome to MoviesInfo" heading appears
- [ ] Navigation bar visible at top
- [ ] Footer visible at bottom
- [ ] Popular Movies section loads
- [ ] Popular TV Shows section loads
- [ ] Trending People section loads
- [ ] All three sections have loading states that appear briefly
- [ ] Images load correctly for movies/TV/people
- [ ] Click on a movie card navigates to `/movies/[id]`
- [ ] SEO meta tags are present:
  - [ ] Title: "MoviesInfo - Discover Movies & TV Shows"
  - [ ] Description visible in page source
  - [ ] Open Graph tags present

### 4️⃣ Movies Section (`/movies`)
- [ ] Page loads successfully
- [ ] Shows "Popular Movies" heading
- [ ] Movie grid displays correctly
- [ ] Each movie card shows:
  - [ ] Poster image
  - [ ] Movie title
  - [ ] Release date
  - [ ] Vote percentage (colored circle)
- [ ] Images are properly sized (no distortion)
- [ ] Vote circle color changes based on rating:
  - [ ] Green for >= 70%
  - [ ] Orange for 50-69%
  - [ ] Red for < 50%
- [ ] Clicking a movie navigates to details page
- [ ] Page title is "Popular Movies - MoviesInfo"
- [ ] SEO metadata is present

### 5️⃣ Movie Details (`/movies/[movieId]`)
- [ ] Page loads for a valid movie ID
- [ ] Shows loading spinner while fetching
- [ ] All movie details appear:
  - [ ] Poster image (left side)
  - [ ] Movie title
  - [ ] Release date
  - [ ] Runtime
  - [ ] Genres (as colored tags)
  - [ ] Vote rating with circular progress
  - [ ] Budget (if available)
  - [ ] Revenue (if available)
  - [ ] Overview/synopsis
- [ ] Cast section appears:
  - [ ] Shows up to 6 cast members
  - [ ] Each shows profile image, name, and character
  - [ ] Images are properly sized
- [ ] Credits section shows:
  - [ ] Directors
  - [ ] Writers (if available)
- [ ] Keywords section appears with tags
- [ ] Recommendations section shows 6 movies
- [ ] Clicking recommended movie navigates correctly
- [ ] Error page appears if movie ID is invalid (404)
- [ ] Page has dynamic SEO:
  - [ ] Title: "[Movie Name] - MoviesInfo"
  - [ ] Open Graph image is movie poster
  - [ ] Description is movie overview

### 6️⃣ Movie Details - Error Handling
- [ ] Navigate to `/movies/99999999` (invalid ID)
- [ ] Error boundary displays gracefully
- [ ] "Failed to Load Movie" message appears
- [ ] "Try Again" button is visible and clickable
- [ ] Clicking "Try Again" resets the error
- [ ] Back button in browser works

### 7️⃣ TV Section (`/tv`)
- [ ] Page loads successfully
- [ ] Shows "Popular TV Shows" heading
- [ ] TV show grid displays correctly
- [ ] Each card shows:
  - [ ] Poster image
  - [ ] Show name
  - [ ] First air date
  - [ ] Vote percentage
- [ ] Clicking a show navigates to details
- [ ] Page title is "Popular TV Shows - MoviesInfo"
- [ ] SEO metadata is present

### 8️⃣ TV Details (`/tv/[tvId]`)
- [ ] Page loads for a valid TV ID
- [ ] Loading spinner appears
- [ ] All TV details show:
  - [ ] Poster image
  - [ ] Show name
  - [ ] First air date
  - [ ] Last air date (if available)
  - [ ] Number of seasons
  - [ ] Number of episodes
  - [ ] Genres (colored tags)
  - [ ] Vote rating
  - [ ] Overview
- [ ] Cast section displays
- [ ] Dynamic SEO works
- [ ] Error page for invalid ID

### 9️⃣ People Section (`/person`)
- [ ] Page loads successfully
- [ ] Shows "Trending People" heading
- [ ] People grid displays correctly
- [ ] Each card shows:
  - [ ] Profile image
  - [ ] Person name
  - [ ] Known for department (Actor, Director, etc.)
  - [ ] Known for titles (brief)
- [ ] Clicking person navigates to details
- [ ] SEO metadata correct

### 🔟 Person Details (`/person/[personId]`)
- [ ] Page loads for valid person ID
- [ ] Shows loading spinner
- [ ] All details appear:
  - [ ] Profile image
  - [ ] Person name
  - [ ] Known for department
  - [ ] Birthday (if available)
  - [ ] Place of birth (if available)
  - [ ] Biography (if available)
  - [ ] Also known as (aliases with tags)
- [ ] Dynamic SEO works
- [ ] Error page for invalid ID

### 1️⃣1️⃣ Navigation Component
- [ ] Navigation bar visible on all pages
- [ ] "MOVIESINFO" logo/text appears
- [ ] Clicking logo navigates to home
- [ ] Movies dropdown menu works:
  - [ ] Hover shows menu
  - [ ] Menu items link correctly:
    - [ ] Popular → `/movies`
    - [ ] Now Playing → `/movies/now-playing`
    - [ ] Upcoming → `/movies/upcoming`
    - [ ] Top Rated → `/movies/top-rated`
- [ ] TV dropdown menu works:
  - [ ] Hover shows menu
  - [ ] Menu items link correctly:
    - [ ] Popular → `/tv`
    - [ ] Airing Today → `/tv/airing-today`
    - [ ] On TV → `/tv/on-the-air`
    - [ ] Top Rated → `/tv/top-rated`
- [ ] People link works → `/person`
- [ ] Search bar appears
- [ ] Search button is clickable
- [ ] Responsive on mobile (hamburger menu)

### 1️⃣2️⃣ Footer Component
- [ ] Footer appears at bottom of all pages
- [ ] TMDB attribution text visible
- [ ] Copyright year is current
- [ ] Footer stays at bottom (doesn't float)

### 1️⃣3️⃣ Loading States
- [ ] Global loading shows on `/`
- [ ] Movie detail loading shows on `/movies/[id]`
- [ ] TV detail loading shows on `/tv/[id]`
- [ ] Person detail loading shows on `/person/[id]`
- [ ] Loading UI is user-friendly (spinner + text)
- [ ] Loading disappears when content loads

### 1️⃣4️⃣ Error Boundaries
- [ ] Global error.js works
- [ ] Movie error boundary works
- [ ] TV error boundary works
- [ ] Person error boundary works
- [ ] Error UI shows friendly message
- [ ] "Try Again" button resets error
- [ ] Error messages are helpful (not technical)

### 1️⃣5️⃣ 404 Page
- [ ] Navigate to `/invalid-page`
- [ ] not-found.js page appears
- [ ] "Page Not Found" message displays
- [ ] No error in console
- [ ] Can navigate away using links

### 1️⃣6️⃣ Images & Media
- [ ] All movie posters load
- [ ] All TV posters load
- [ ] All profile images load
- [ ] Images don't distort (proper aspect ratio)
- [ ] Images are responsive on mobile
- [ ] No broken image placeholders
- [ ] Image URLs are from TMDB (https)
- [ ] Lazy loading works (images load as you scroll)

### 1️⃣7️⃣ Performance
- [ ] Home page loads in < 3 seconds
- [ ] Movie list loads in < 2 seconds
- [ ] Movie detail loads in < 2 seconds
- [ ] Images load without delay
- [ ] No unnecessary API calls in Network tab
- [ ] No console errors or warnings
- [ ] No memory leaks (DevTools profiler)
- [ ] Bundle size is reasonable:
  - [ ] HTML < 50KB
  - [ ] JS < 500KB
  - [ ] CSS < 100KB

### 1️⃣8️⃣ Mobile Responsiveness
- [ ] Test on mobile (375px width)
  - [ ] Navigation hamburger menu works
  - [ ] Cards stack vertically
  - [ ] Images resize properly
  - [ ] Text is readable
  - [ ] Buttons are clickable
- [ ] Test on tablet (768px width)
  - [ ] Layout adjusts correctly
  - [ ] 2 columns of cards
  - [ ] Navigation still works
- [ ] Test on desktop (1024px width)
  - [ ] 4+ columns of cards
  - [ ] Layout optimal

### 1️⃣9️⃣ Browser Compatibility
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] All pages render correctly
- [ ] No console errors
- [ ] All features work

### 2️⃣0️⃣ SEO & Meta Tags
- [ ] Home page:
  - [ ] Title: "MoviesInfo - Discover Movies & TV Shows"
  - [ ] Description: Present
  - [ ] Open Graph: title, description, type, locale
- [ ] Movie pages:
  - [ ] Title: Movie name + "- MoviesInfo"
  - [ ] Description: Movie overview (first 160 chars)
  - [ ] OG Image: Movie poster
  - [ ] OG Type: movie
- [ ] TV pages:
  - [ ] Title: Show name + "- MoviesInfo"
  - [ ] Description: Show overview
  - [ ] OG Image: Show poster
  - [ ] OG Type: tv.series
- [ ] Person pages:
  - [ ] Title: Person name + "- MoviesInfo"
  - [ ] Description: Biography (first 160 chars)
  - [ ] OG Image: Profile image
  - [ ] OG Type: profile

### 2️⃣1️⃣ Security
- [ ] API key NOT in:
  - [ ] Source code
  - [ ] constants.js
  - [ ] Client components
  - [ ] Network requests (check DevTools Network tab)
- [ ] API key IS in:
  - [ ] `.env.local`
  - [ ] `.gitignore`
- [ ] All API calls to TMDB use HTTPS
- [ ] No sensitive data in URL parameters
- [ ] No sensitive data in localStorage

### 2️⃣2️⃣ Console & Debugging
- [ ] No error messages in console
- [ ] No warning messages (except expected ones)
- [ ] No red X badges
- [ ] No deprecation warnings
- [ ] DevTools Network tab shows:
  - [ ] Proper HTTP responses (200, 304)
  - [ ] No 4xx or 5xx errors
  - [ ] Images load successfully
  - [ ] API calls to TMDB work
- [ ] React DevTools show correct component hierarchy

### 2️⃣3️⃣ API Calls
- [ ] Open DevTools Network tab
- [ ] Navigate to movie details
- [ ] Verify API calls are made:
  - [ ] Movie data fetches
  - [ ] Credits fetch
  - [ ] Keywords fetch
  - [ ] Recommendations fetch
- [ ] All responses are 200 OK
- [ ] Response data has expected properties
- [ ] No API errors in response

### 2️⃣4️⃣ Caching & ISR
- [ ] Refresh page - loads from cache (fast)
- [ ] After 1+ hour, verify cache revalidates
- [ ] Old data should be replaced with fresh data
- [ ] No stale content shown to users

### 2️⃣5️⃣ Production Build
- [ ] `npm run build` completes without errors
- [ ] Build output shows optimized bundle
- [ ] `.next/` folder created
- [ ] `npm start` runs production build
- [ ] All pages work in production mode
- [ ] Performance is good in production

---

## 🎯 Sign-Off Checklist

### Before Deployment
- [ ] All 25 sections tested ✅
- [ ] No critical bugs found
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] SEO metadata correct
- [ ] Security verified
- [ ] No console errors
- [ ] Environment configured
- [ ] Build successful
- [ ] Ready for deployment ✅

### Deployment Checklist
- [ ] Environment variables set on hosting
- [ ] `.env.local` NOT deployed
- [ ] Build succeeds on hosting platform
- [ ] All routes accessible
- [ ] Final smoke test on live site
- [ ] Monitor error logs for 24 hours
- [ ] Performance metrics baseline

---

## 📝 Notes

**Test Date:** _______________  
**Tester Name:** _______________  
**Browser:** _______________  
**Issues Found:** _______________  
**Resolution:** _______________  

---

**✅ Ready to Deploy!** 🚀
