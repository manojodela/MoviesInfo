# Deployment Troubleshooting Guide

## 500 Internal Server Error on Page Refresh

### Root Cause
After fixing the blank screen issue, the app was returning 500 errors on dynamic page refreshes (e.g., `/movies/123`). This was caused by:
1. Environment variables not being available at module load time
2. API call failures not being gracefully handled
3. Missing ISR revalidation configuration on dynamic routes

### ✅ Solutions Applied

#### 1. Fixed Environment Variable Handling in `lib/tmdbClient.js`
- Removed throwing error at module load time
- Moved validation to `fetchFromTMDB()` runtime function
- Added fallback for `TMDB_API_BASE_URL` to default URL
- Provides better error messages if API key is missing at runtime

#### 2. Improved Error Handling in Dynamic Pages
All detail pages (`/movies/[movieId]`, `/tv/[tvId]`, `/person/[personId]`) now:
- Fetch main content first, fail if not found
- Fetch additional data with individual error handling
- Return graceful fallbacks (empty arrays) if secondary data fails
- Log detailed errors for debugging
- Have proper Suspense boundaries and error.js boundaries

#### 3. Added ISR Configuration to Dynamic Routes
```javascript
// app/movies/[movieId]/page.js
export const revalidate = 86400; // 24 hours ISR
```

#### 4. Debug Endpoint
Access `/api/debug` to check if environment variables are loaded:
```bash
curl https://your-site.netlify.app/api/debug
```

---

## Blank Screen on Page Refresh (PREVIOUSLY FIXED)

### Root Cause
The old `netlify.toml` had a catch-all SPA redirect that sent all requests to `/index.html`, which broke Next.js App Router's server-side routing.

### ✅ Solution Applied

#### 1. Updated `netlify.toml`
- Removed SPA redirect (`from = "/*" to = "/index.html"`)
- Set proper build output: `.next` (not `.next/static`)
- Added cache headers for static assets
- Added security headers
- Configured environment variables

#### 2. Updated `next.config.js`
- Added `swcMinify: true` for Netlify compatibility
- Added ISR configuration
- Added cache headers function

#### 3. Environment Variables
- Make sure `TMDB_API_KEY` and `TMDB_API_BASE_URL` are set in Netlify
- Copy from `.env.local.example` to Netlify environment settings

---

## Deployment Steps

### Local Setup
```bash
# Install dependencies
npm install

# Set environment variables
cp .env.local.example .env.local
# Edit .env.local with your TMDB API key

# Test build locally
npm run build
npm start
```

### Deploy to Netlify
```bash
# Push to GitHub/GitLab
git add .
git commit -m "fix: deployment configuration"
git push origin master

# Connect to Netlify (one-time setup)
# 1. Go to netlify.com
# 2. Connect your repository
# 3. Set build command: npm run build
# 4. Set publish directory: .next/static
# 5. Add environment variables:
#    - TMDB_API_KEY (from .env.local)
#    - TMDB_API_BASE_URL=https://api.themoviedb.org/3
#    - NODE_VERSION=18

# Trigger deployment
git push origin master
```

---

## Common Issues & Solutions

### Issue 1: Blank Screen After Refresh
**Symptoms:** Site works initially, but blank on page refresh
**Cause:** SPA redirect catching all routes
**Fix:** Use updated `netlify.toml` (applied)

### Issue 2: Environment Variables Not Found
**Symptoms:** "Missing TMDB environment variables" error
**Cause:** Env vars not set in Netlify
**Fix:** 
1. Go to Netlify Deploy Settings
2. Add TMDB_API_KEY and TMDB_API_BASE_URL
3. Trigger rebuild

### Issue 3: ISR Not Working
**Symptoms:** Pages show stale content forever
**Cause:** Cache headers too aggressive
**Fix:** Verify `netlify.toml` headers section is correct

### Issue 4: Images Not Loading
**Symptoms:** Movie/show posters missing
**Cause:** TMDB image URL misconfiguration
**Fix:** Check `next.config.js` remote patterns are correct

---

## Verification Checklist

After deployment:
- [ ] Home page loads: `https://yoursite.com/`
- [ ] Movies page: `https://yoursite.com/movies`
- [ ] Page refresh works (no blank screen)
- [ ] Movie details load: `https://yoursite.com/movies/123`
- [ ] Search works: `https://yoursite.com/search?q=test`
- [ ] Images display correctly
- [ ] No 404 errors in console
- [ ] API calls succeed (check Network tab)

---

## Build & Deployment Info

### Build Output
```
.next/
├── static/           → Served by Netlify
├── server/           → Server functions
└── ...
```

### Cache Strategy
- **Static assets** (.js, .css): 1 year (immutable)
- **HTML pages**: No cache (rely on ISR revalidate times)
- **API routes**: 1 hour cache
- **Images**: Optimized and cached by browser

### ISR Revalidation Times
- Homepage: 24 hours
- Movie/TV details: 24 hours
- Category pages: 12-24 hours
- Search results: Real-time (SSR)
- Top-rated: 7 days

---

## Rollback Plan

If deployment issues persist:

```bash
# Revert netlify.toml
git checkout HEAD~1 netlify.toml

# Revert next.config.js
git checkout HEAD~1 next.config.js

# Push rollback
git add .
git commit -m "revert: deployment config"
git push origin master
```

---

## Performance Monitoring

Monitor after deployment:
1. **First Contentful Paint (FCP)** - Should be <2s
2. **Largest Contentful Paint (LCP)** - Should be <2.5s
3. **Cumulative Layout Shift (CLS)** - Should be <0.1
4. **API response time** - Should be <500ms

Check via:
- Netlify Analytics
- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)

---

## Still Having Issues?

1. **Check Netlify Logs**
   - Go to Netlify Dashboard
   - Deploy Logs → Check for errors

2. **Check Browser Console**
   - Open DevTools (F12)
   - Check Console and Network tabs

3. **Verify Environment**
   - `NODE_VERSION` should be 18+
   - `NEXT_PUBLIC_API_URL` should be set

4. **Force Rebuild**
   - Netlify Dashboard → Deploys → Trigger deploy

---

**Last Updated:** January 22, 2026
