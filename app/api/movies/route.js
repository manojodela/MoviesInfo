/**
 * Example API route for movies (optional)
 * This can be used to add server-side logic or filtering
 * 
 * Usage: /api/movies?page=1&sort_by=popularity.desc
 */

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    console.log('Received request URL:', request.url);
    // Extract query parameters
    const page = searchParams.get('page') || '1';
    const sortBy = searchParams.get('sort_by') || 'popularity.desc';
    
    // Build query string
    const queryString = new URLSearchParams({
      page,
      sort_by: sortBy,
      language: 'en-US',
    }).toString();

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${queryString}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
