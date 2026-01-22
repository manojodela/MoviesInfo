/**
 * TMDB API Client for Server Components
 * This runs only on the server, API key is never exposed to the client
 */

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_BASE_URL = process.env.TMDB_API_BASE_URL || 'https://api.themoviedb.org/3';

// Debug: Log configuration status
if (typeof window === 'undefined') {
  console.log('🔧 TMDB Configuration:');
  console.log('   API Key Set:', !!TMDB_API_KEY);
  console.log('   API URL:', TMDB_API_BASE_URL);
  console.log('   Environment:', process.env.NODE_ENV);
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchFromTMDB(endpoint, options = {}) {
  // Validate environment variables at runtime, not at module load
  if (!TMDB_API_KEY) {
    const error = new Error('TMDB_API_KEY environment variable is not set. Please configure it in your Netlify environment variables or .env.local file.');
    console.error('🔴 TMDB Configuration Error:', error.message);
    throw error;
  }

  const url = `${TMDB_API_BASE_URL}${endpoint}`;
  
  try {
    console.log(`📡 Fetching from TMDB: ${endpoint}`);
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TMDB_API_KEY}`,
        ...options.headers,
      },
      ...options,
      // Add revalidation for ISR
      next: {
        revalidate: options.revalidate || 3600, // 1 hour default
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      // For 404 errors, try to parse as JSON to check for status_code
      if (response.status === 404) {
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.status_code === 34) {
            // Movie/TV show not found - return the error object so it can be handled by notFound()
            return errorData;
          }
        } catch (e) {
          // If JSON parse fails, continue with regular error
        }
      }
      throw new Error(`TMDB API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ Successfully fetched: ${endpoint}`);
    return data;
  } catch (error) {
    console.error(`🔴 TMDB API Error (${endpoint}):`, error);
    throw new Error(`Failed to fetch data from TMDB: ${error.message}`);
  }
}

/**
 * Discover movies with filters
 */
export async function discoverMovies(params = {}) {
  const queryString = new URLSearchParams({
    language: 'en-US',
    page: 1,
    ...params,
  }).toString();

  return fetchFromTMDB(`/discover/movie?${queryString}`, {
    revalidate: 3600,
  });
}

/**
 * Get movie details
 */
export async function getMovieDetails(movieId) {
  return fetchFromTMDB(`/movie/${movieId}?language=en-US`, {
    revalidate: 0, // No caching to avoid ISR issues
  });
}

/**
 * Get movie credits
 */
export async function getMovieCredits(movieId) {
  return fetchFromTMDB(`/movie/${movieId}/credits?language=en-US`, {
    revalidate: 0, // No caching to avoid ISR issues
  });
}

/**
 * Get movie recommendations
 */
export async function getMovieRecommendations(movieId) {
  return fetchFromTMDB(`/movie/${movieId}/recommendations?language=en-US`, {
    revalidate: 0, // No caching to avoid ISR issues
  });
}

/**
 * Get movie keywords
 */
export async function getMovieKeywords(movieId) {
  return fetchFromTMDB(`/movie/${movieId}/keywords`, {
    revalidate: 0, // No caching to avoid ISR issues
  });
}

/**
 * Get genres for movies
 */
export async function getMovieGenres() {
  return fetchFromTMDB('/genre/movie/list?language=en-US', {
    revalidate: 604800, // 7 days
  });
}

/**
 * Get available languages
 */
export async function getLanguages() {
  return fetchFromTMDB('/configuration/languages', {
    revalidate: 604800,
  });
}

/**
 * Discover TV shows with filters
 */
export async function discoverTV(params = {}) {
  const queryString = new URLSearchParams({
    language: 'en-US',
    page: 1,
    ...params,
  }).toString();

  return fetchFromTMDB(`/discover/tv?${queryString}`, {
    revalidate: 3600,
  });
}

/**
 * Get TV show details
 */
export async function getTVDetails(tvId) {
  return fetchFromTMDB(`/tv/${tvId}?language=en-US`, {
    revalidate: 0, // No caching to avoid ISR issues
  });
}

/**
 * Get TV show credits
 */
export async function getTVCredits(tvId) {
  return fetchFromTMDB(`/tv/${tvId}/credits?language=en-US`, {
    revalidate: 0, // No caching to avoid ISR issues
  });
}

/**
 * Get trending people
 */
export async function getTrendingPeople(timeWindow = 'day', page = 1) {
  const queryString = new URLSearchParams({
    language: 'en-US',
    page,
  }).toString();
  return fetchFromTMDB(`/trending/person/${timeWindow}?${queryString}`, {
    revalidate: 3600,
  });
}

/**
 * Get person details
 */
export async function getPersonDetails(personId) {
  return fetchFromTMDB(`/person/${personId}?language=en-US`, {
    revalidate: 0, // No caching to avoid ISR issues
  });
}

/**
 * Get TV show recommendations
 */
export async function getTVRecommendations(tvId) {
  return fetchFromTMDB(`/tv/${tvId}/recommendations?language=en-US`, {
    revalidate: 0, // No caching to avoid ISR issues
  });
}

/**
 * Get person's credits (movies and TV shows they appeared in)
 */
export async function getPersonCredits(personId) {
  return fetchFromTMDB(`/person/${personId}/combined_credits?language=en-US`, {
    revalidate: 0, // No caching to avoid ISR issues
  });
}

/**
 * Search movies
 */
export async function searchMovies(query, page = 1) {
  const queryString = new URLSearchParams({
    query,
    page,
    language: 'en-US',
  }).toString();

  return fetchFromTMDB(`/search/movie?${queryString}`, {
    revalidate: 3600,
  });
}

/**
 * Search TV shows
 */
export async function searchTV(query, page = 1) {
  const queryString = new URLSearchParams({
    query,
    page,
    language: 'en-US',
  }).toString();

  return fetchFromTMDB(`/search/tv?${queryString}`, {
    revalidate: 3600,
  });
}

/**
 * Search people
 */
export async function searchPeople(query, page = 1) {
  const queryString = new URLSearchParams({
    query,
    page,
    language: 'en-US',
  }).toString();

  return fetchFromTMDB(`/search/person?${queryString}`, {
    revalidate: 3600,
  });
}
