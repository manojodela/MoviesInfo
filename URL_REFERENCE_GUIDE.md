# 🔗 Complete URL Reference Guide

## 🎬 Movie Detail Pages (with Cast Carousel)

### Popular Movies with Cast
- http://localhost:3000/movies/550 - Fight Club (Brad Pitt, Edward Norton)
- http://localhost:3000/movies/278 - The Shawshank Redemption (Tim Robbins, Morgan Freeman)
- http://localhost:3000/movies/680 - Pulp Fiction (John Travolta, Uma Thurman)
- http://localhost:3000/movies/238 - The Godfather (Marlon Brando, Al Pacino)
- http://localhost:3000/movies/496243 - Top Gun: Maverick (Tom Cruise, Miles Teller)

### Action Movies
- http://localhost:3000/movies/129 - The Matrix (Keanu Reeves, Laurence Fishburne)
- http://localhost:3000/movies/155 - The Dark Knight (Christian Bale, Heath Ledger)
- http://localhost:3000/movies/121 - Die Hard (Bruce Willis, Alan Rickman)
- http://localhost:3000/movies/559 - Terminator 2: Judgment Day (Arnold Schwarzenegger)

### Drama Movies
- http://localhost:3000/movies/289 - Forrest Gump (Tom Hanks, Sally Field)
- http://localhost:3000/movies/630 - Forrest Gump (Tom Hanks)
- http://localhost:3000/movies/857 - Saving Private Ryan (Tom Hanks, Edward Burns)

### Comedy Movies
- http://localhost:3000/movies/603 - The Matrix (Keanu Reeves)
- http://localhost:3000/movies/278 - The Shawshank Redemption (Morgan Freeman)

---

## 📺 TV Show Detail Pages (with Cast Carousel)

### Popular TV Shows
- http://localhost:3000/tv/1399 - Breaking Bad (Bryan Cranston, Aaron Paul)
- http://localhost:3000/tv/1402 - The Office (Steve Carell, Rainn Wilson)
- http://localhost:3000/tv/1418 - The Good Wife (Julianna Margulies, Chris Noth)
- http://localhost:3000/tv/1437 - The Mentalist (Patrick Jane, Robin Tunney)
- http://localhost:3000/tv/1420 - Game of Thrones (Emilia Clarke, Kit Harington)

### Streaming Shows
- http://localhost:3000/tv/50463 - Better Call Saul (Bob Odenkirk)
- http://localhost:3000/tv/33646 - House of Cards (Kevin Spacey, Robin Wright)
- http://localhost:3000/tv/46959 - Stranger Things (Winona Ryder, David Harbour)
- http://localhost:3000/tv/1633 - The Crown (Claire Foy, Matt Smith)

---

## 📄 Movie Listing Pages (with Pagination)

### Popular Movies
- http://localhost:3000/movies - Popular movies (Page 1, 20 per page)
- http://localhost:3000/movies?page=1 - First page
- http://localhost:3000/movies?page=2 - Page 2
- http://localhost:3000/movies?page=10 - Page 10
- http://localhost:3000/movies?page=50 - Page 50

### Now Playing
- http://localhost:3000/movies/now-playing - Movies currently in theaters
- http://localhost:3000/movies/now-playing?page=1 - First page
- http://localhost:3000/movies/now-playing?page=2 - Page 2
- http://localhost:3000/movies/now-playing?page=5 - Page 5

### Upcoming Movies
- http://localhost:3000/movies/upcoming - Movies coming soon
- http://localhost:3000/movies/upcoming?page=1 - First page
- http://localhost:3000/movies/upcoming?page=2 - Page 2
- http://localhost:3000/movies/upcoming?page=3 - Page 3

### Top Rated Movies
- http://localhost:3000/movies/top-rated - Best rated movies
- http://localhost:3000/movies/top-rated?page=1 - First page
- http://localhost:3000/movies/top-rated?page=2 - Page 2
- http://localhost:3000/movies/top-rated?page=5 - Page 5

---

## 📺 TV Show Listing Pages (with Pagination)

### Popular TV Shows
- http://localhost:3000/tv - Popular TV shows (Page 1, 20 per page)
- http://localhost:3000/tv?page=1 - First page
- http://localhost:3000/tv?page=2 - Page 2
- http://localhost:3000/tv?page=10 - Page 10

### Airing Today
- http://localhost:3000/tv/airing-today - Shows airing today
- http://localhost:3000/tv/airing-today?page=1 - First page
- http://localhost:3000/tv/airing-today?page=2 - Page 2

### On The Air
- http://localhost:3000/tv/on-the-air - Shows currently on air
- http://localhost:3000/tv/on-the-air?page=1 - First page
- http://localhost:3000/tv/on-the-air?page=2 - Page 2

### Top Rated TV Shows
- http://localhost:3000/tv/top-rated - Best rated TV shows
- http://localhost:3000/tv/top-rated?page=1 - First page
- http://localhost:3000/tv/top-rated?page=2 - Page 2

---

## 👥 People Pages

### Trending People
- http://localhost:3000/person - Trending actors/directors (Page 1, 20 per page)
- http://localhost:3000/person?page=1 - First page
- http://localhost:3000/person?page=2 - Page 2
- http://localhost:3000/person?page=10 - Page 10

### Individual Actors
- http://localhost:3000/person/287 - Brad Pitt
- http://localhost:3000/person/3 - Tom Hanks
- http://localhost:3000/person/88 - Keanu Reeves
- http://localhost:3000/person/192 - Morgan Freeman
- http://localhost:3000/person/2888 - Heath Ledger
- http://localhost:3000/person/1956 - Christian Bale
- http://localhost:3000/person/11 - Al Pacino

---

## 🏠 Main Pages

### Homepage
- http://localhost:3000 - Main homepage with trending content

### Navigation
- Click "Movies" in navigation → /movies
- Click "TV Shows" in navigation → /tv
- Click "People" in navigation → /person
- Hover over "Movies" dropdown:
  - Now Playing → /movies/now-playing
  - Upcoming → /movies/upcoming
  - Top Rated → /movies/top-rated
- Hover over "TV Shows" dropdown:
  - Airing Today → /tv/airing-today
  - On The Air → /tv/on-the-air
  - Top Rated → /tv/top-rated

---

## 🧪 Testing Workflow

### Test 1: Cast Carousel
```
1. Go to http://localhost:3000/movies/550
2. Scroll to "Cast" section
3. See first 6 cast members
4. Click "Next" button → see more
5. Click dots → jump to pages
6. Click any actor → goes to /person/[id]
```

### Test 2: Pagination
```
1. Go to http://localhost:3000/movies
2. Scroll to bottom
3. See pagination controls
4. Click "Page 2" → URL becomes ?page=2
5. Content updates
6. Try different pages
7. Use Previous/Next buttons
```

### Test 3: Full Exploration Flow
```
1. Go to http://localhost:3000/movies
2. Click on any movie (e.g., page 2)
3. Scroll to cast carousel
4. Click on any actor
5. View their profile at /person/[id]
6. Go back and explore other movies
```

### Test 4: Mobile
```
1. Open DevTools (F12)
2. Click device toolbar (mobile view)
3. Try all URLs
4. Test carousel on mobile
5. Test pagination on mobile
6. Verify responsive design
```

---

## 📊 Pagination Statistics

### Typical Page Counts
- Popular Movies: ~1000 pages (20,000 movies)
- Popular TV Shows: ~500 pages (10,000 shows)
- Now Playing: ~20 pages (varies by season)
- Upcoming: ~30-40 pages
- Top Rated Movies: ~100+ pages
- Top Rated TV: ~50+ pages
- Trending People: ~200+ pages

### Navigation Examples
- First Page: ?page=1 or no parameter
- Last Page (Movies): ?page=1000
- Middle Page: ?page=500
- Specific Page: ?page=123

---

## 🎯 Popular Movie IDs for Testing

| ID | Movie | Cast |
|----|-------|------|
| 550 | Fight Club | Brad Pitt, Edward Norton |
| 278 | The Shawshank Redemption | Tim Robbins, Morgan Freeman |
| 238 | The Godfather | Marlon Brando, Al Pacino |
| 680 | Pulp Fiction | John Travolta, Uma Thurman |
| 129 | The Matrix | Keanu Reeves, Laurence Fishburne |
| 155 | The Dark Knight | Christian Bale, Heath Ledger |
| 857 | Saving Private Ryan | Tom Hanks, Edward Burns |
| 289 | Forrest Gump | Tom Hanks, Sally Field |
| 559 | Terminator 2 | Arnold Schwarzenegger |
| 496243 | Top Gun: Maverick | Tom Cruise, Miles Teller |

---

## 🎬 Popular TV Show IDs for Testing

| ID | Show | Cast |
|----|------|------|
| 1399 | Breaking Bad | Bryan Cranston, Aaron Paul |
| 1402 | The Office | Steve Carell, Rainn Wilson |
| 1418 | The Good Wife | Julianna Margulies, Chris Noth |
| 1420 | Game of Thrones | Emilia Clarke, Kit Harington |
| 1437 | The Mentalist | Patrick Jane, Robin Tunney |
| 50463 | Better Call Saul | Bob Odenkirk |
| 33646 | House of Cards | Kevin Spacey, Robin Wright |
| 46959 | Stranger Things | Winona Ryder, David Harbour |
| 1633 | The Crown | Claire Foy, Matt Smith |

---

## 👤 Popular Actor IDs for Testing

| ID | Actor | Known For |
|----|-------|----------|
| 287 | Brad Pitt | Fight Club, Ocean's Eleven |
| 3 | Tom Hanks | Forrest Gump, Saving Private Ryan |
| 88 | Keanu Reeves | The Matrix, John Wick |
| 192 | Morgan Freeman | The Shawshank Redemption, Dark Knight |
| 2888 | Heath Ledger | The Dark Knight, Brokeback Mountain |
| 1956 | Christian Bale | Batman Trilogy, American Psycho |
| 11 | Al Pacino | The Godfather, Scarface |
| 1223 | Uma Thurman | Pulp Fiction, Kill Bill |

---

## 🔄 Exploration Chains

### Chain 1: Brad Pitt Journey
```
/movies (browse movies)
  ↓
/movies?page=2 (find Fight Club)
  ↓
/movies/550 (Fight Club detail)
  ↓
Scroll to cast, click Brad Pitt
  ↓
/person/287 (Brad Pitt profile)
  ↓
Click Ocean's Eleven
  ↓
/movies/115497 (Ocean's Eleven)
  ↓
See George Clooney in cast
  ↓
/person/1461 (George Clooney)
  ↓
See ER in known for
  ↓
/tv/697 (ER TV show)
```

### Chain 2: Breaking Bad Exploration
```
/tv (browse TV shows)
  ↓
/tv (find Breaking Bad or browse)
  ↓
/tv/1399 (Breaking Bad detail)
  ↓
Scroll to cast, click Bryan Cranston
  ↓
/person/4 (Bryan Cranston profile)
  ↓
Click on another famous show
  ↓
Explore that show's cast
  ↓
Click on another actor
  ↓
Continue exploring!
```

---

## 📝 Bookmarking Tips

Save these URLs for quick access:

### My Favorites
- http://localhost:3000/movies/550 - Fight Club (best cast carousel)
- http://localhost:3000/tv/1399 - Breaking Bad (great for TV carousel)
- http://localhost:3000/movies - Good for testing pagination
- http://localhost:3000/person - People browsing with pagination

### Testing Pages
- http://localhost:3000/movies?page=1 - Page 1
- http://localhost:3000/movies?page=2 - Page 2
- http://localhost:3000/movies/top-rated?page=1 - Alternative category

---

## 🔗 All Base URLs at a Glance

**Main:**
- / (Homepage)

**Movies:**
- /movies (Popular)
- /movies/now-playing (Now Playing)
- /movies/upcoming (Upcoming)
- /movies/top-rated (Top Rated)
- /movies/[id] (Movie Detail)

**TV:**
- /tv (Popular)
- /tv/airing-today (Airing Today)
- /tv/on-the-air (On The Air)
- /tv/top-rated (Top Rated)
- /tv/[id] (Show Detail)

**People:**
- /person (Trending)
- /person/[id] (Person Detail)

---

## 💡 Pro Tips

1. **Remember page numbers**: Jot down page numbers of interesting content
2. **Try different page numbers**: Each page shows different content
3. **Follow actors**: Click cast members to see their other work
4. **Use combinations**: Visit movie then click actor in cast
5. **Mobile testing**: Test pagination on mobile (top - right menu button)
6. **Random browsing**: Click random page numbers for discovery
7. **Bookmark favorites**: Bookmark movie/person URLs you like

---

## 🎊 Enjoy Exploring!

Use these URLs to test and explore your MoviesInfo app!
