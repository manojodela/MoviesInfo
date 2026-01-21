import { Suspense } from 'react';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import { searchMovies, searchTV, searchPeople } from '@/lib/tmdbClient';
import { getTMDBImageUrl } from '@/lib/utils';

// SSR: Disable caching - render on every request for fresh search results
export const revalidate = 0;

export async function generateMetadata({ searchParams }) {
  const query = searchParams?.q || 'Search';
  return {
    title: `${query} - Search Results - MoviesInfo`,
    description: `Search results for "${query}" on MoviesInfo`,
  };
}

async function SearchResults({ query, page = 1 }) {
  if (!query || query.trim() === '') {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ fontSize: '1.1rem', color: '#999' }}>Please enter a search query</p>
      </div>
    );
  }

  try {
    const [moviesData, tvData, peopleData] = await Promise.all([
      searchMovies(query, page),
      searchTV(query, page),
      searchPeople(query, page),
    ]);

    const movies = moviesData.results || [];
    const tvShows = tvData.results || [];
    const people = peopleData.results || [];

    const hasResults = movies.length > 0 || tvShows.length > 0 || people.length > 0;

    if (!hasResults) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '1.1rem', color: '#999' }}>No results found for "{query}"</p>
        </div>
      );
    }

    return (
      <div>
        {/* Movies Results */}
        {movies.length > 0 && (
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ marginBottom: '20px' }}>Movies ({moviesData.total_results})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {movies.slice(0, 12).map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ cursor: 'pointer', transition: 'transform 0.2s', borderRadius: '8px', overflow: 'hidden' }}>
                    {movie.poster_path ? (
                      <img
                        alt={movie.title}
                        src={getTMDBImageUrl(movie.poster_path, 'w200')}
                        style={{ width: '100%', height: '225px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '225px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        No Image
                      </div>
                    )}
                    <p style={{ fontSize: '0.95rem', fontWeight: '500', margin: '8px 0 4px 0' }}>
                      {movie.title}
                    </p>
                    {movie.release_date && (
                      <p style={{ fontSize: '0.85rem', color: '#666', margin: '0' }}>
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* TV Shows Results */}
        {tvShows.length > 0 && (
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ marginBottom: '20px' }}>TV Shows ({tvData.total_results})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {tvShows.slice(0, 12).map((show) => (
                <Link
                  key={show.id}
                  href={`/tv/${show.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ cursor: 'pointer', transition: 'transform 0.2s', borderRadius: '8px', overflow: 'hidden' }}>
                    {show.poster_path ? (
                      <img
                        alt={show.name}
                        src={getTMDBImageUrl(show.poster_path, 'w200')}
                        style={{ width: '100%', height: '225px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '225px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        No Image
                      </div>
                    )}
                    <p style={{ fontSize: '0.95rem', fontWeight: '500', margin: '8px 0 4px 0' }}>
                      {show.name}
                    </p>
                    {show.first_air_date && (
                      <p style={{ fontSize: '0.85rem', color: '#666', margin: '0' }}>
                        {new Date(show.first_air_date).getFullYear()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* People Results */}
        {people.length > 0 && (
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ marginBottom: '20px' }}>People ({peopleData.total_results})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {people.slice(0, 12).map((person) => (
                <Link
                  key={person.id}
                  href={`/person/${person.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ cursor: 'pointer', transition: 'transform 0.2s', borderRadius: '8px', overflow: 'hidden' }}>
                    {person.profile_path ? (
                      <img
                        alt={person.name}
                        src={getTMDBImageUrl(person.profile_path, 'w200')}
                        style={{ width: '100%', height: '225px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '225px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        No Image
                      </div>
                    )}
                    <p style={{ fontSize: '0.95rem', fontWeight: '500', margin: '8px 0 4px 0' }}>
                      {person.name}
                    </p>
                    {person.known_for_department && (
                      <p style={{ fontSize: '0.85rem', color: '#666', margin: '0' }}>
                        {person.known_for_department}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Search error:', error);
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ fontSize: '1.1rem', color: '#999' }}>Error performing search. Please try again.</p>
      </div>
    );
  }
}

export default function SearchPage({ searchParams }) {
  const query = searchParams?.q || '';
  const page = parseInt(searchParams?.page) || 1;

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>
        Search Results for "<span style={{ color: '#1890ff' }}>{decodeURIComponent(query)}</span>"
      </h1>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#999' }}>Searching...</div>}>
        <SearchResults query={decodeURIComponent(query)} page={page} />
      </Suspense>
    </div>
  );
}
