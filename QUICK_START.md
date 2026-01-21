# Quick Start Guide - App Router Migration

## 🚀 Get Running in 5 Minutes

### Step 1: Set Up Environment Variables
```bash
# Create .env.local file in project root
TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDkxMTM3ODFhMzdkOTIwZWNkMTQ0YWUyOThjMzRlOCIsInN1YiI6IjYzOWMwZDM4MTg4NjRiMDA3ZGRkMjA4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0KP839F96O7Vg-bpFhx57Emj5lQ2k_yzhDBcp-_pM8Q
TMDB_API_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_PROFILE_PATH=https://www.themoviedb.org/t/p/w440_and_h660_face
NEXT_PUBLIC_IMAGE_PATH=https://image.tmdb.org/t/p
```

⚠️ **Important:** Never commit `.env.local` to git!

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Run Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 📁 What Changed

### Old Structure (Pages Router)
```
pages/
  ├── index.js
  ├── _app.js
  ├── _document.js
  ├── movies/[movieId].js
  └── tv/[tvId].js
```

### New Structure (App Router)
```
app/
  ├── page.js           ← Home page
  ├── layout.js         ← Root layout (replaces _app.js + _document.js)
  ├── error.js          ← Error boundary
  ├── not-found.js      ← 404 page
  ├── loading.js        ← Loading state
  ├── movies/
  │   ├── page.js       ← Movies list
  │   └── [movieId]/
  │       ├── page.js   ← Movie details
  │       ├── loading.js
  │       └── error.js
  └── tv/
      ├── page.js       ← TV list
      └── [tvId]/
          ├── page.js   ← TV details
          ├── loading.js
          └── error.js
```

---

## 🔐 Security Improvements

### ✅ API Key Now Hidden
- Before: Token exposed in `constants.js` (frontend)
- After: Token in `.env.local` (server-only)

### ✅ How it Works
```javascript
// lib/tmdbClient.js (Server Component)
const TMDB_API_KEY = process.env.TMDB_API_KEY;
// ✓ Only available on server
// ✓ Never sent to browser
// ✓ Secure!
```

---

## 🎯 Key Files to Know

| File | Purpose |
|------|---------|
| `app/layout.js` | Root layout with Navigation & Footer |
| `app/page.js` | Home page (popular movies, TV, people) |
| `lib/tmdbClient.js` | Server-side API client (SECURE!) |
| `lib/utils.js` | Helper functions |
| `components/Navigation.js` | Top navigation (client component) |
| `.env.local` | API keys & configuration |
| `next.config.js` | Next.js settings |

---

## ✨ Available Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page |
| `/movies` | Popular movies |
| `/movies/[movieId]` | Movie details |
| `/tv` | Popular TV shows |
| `/tv/[tvId]` | TV show details |
| `/person` | Trending people |
| `/person/[personId]` | Person details |

---

## 🔧 Common Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🐛 Troubleshooting

### Issue: API key not working
**Solution:** Make sure `.env.local` file exists in project root with correct key

### Issue: Images not loading
**Solution:** Check if TMDB image path is correct in `.env.local`

### Issue: CORS error
**Solution:** This should not happen as API calls are server-side. Check `lib/tmdbClient.js`

### Issue: Page not found
**Solution:** Use routes mentioned above. Old Pages Router routes won't work.

---

## 📚 Learn More

- [App Router vs Pages Router](./MIGRATION_GUIDE.md#🔄-key-changes-from-pages-router)
- [Full Implementation Details](./IMPLEMENTATION_SUMMARY.md)
- [Official Next.js Docs](https://nextjs.org/docs/app)

---

## ✅ Checklist Before Deployment

- [ ] `.env.local` created with API key
- [ ] `.env.local` added to `.gitignore`
- [ ] All pages tested (home, movies, TV, people)
- [ ] Images loading properly
- [ ] No console errors
- [ ] Search functionality working
- [ ] Navigation working on all pages
- [ ] Error pages showing correctly
- [ ] Loading states visible
- [ ] SEO metadata visible in page source

---

## 🎉 You're All Set!

The migration is complete and ready to use. Start the dev server and enjoy the new App Router! 🚀

Have questions? Check out [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed explanations.
