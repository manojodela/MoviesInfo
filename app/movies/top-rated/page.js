import { Suspense } from 'react';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import { discoverMovies } from '@/lib/tmdbClient';
import { getTMDBImageUrl, formatVotePercentage, getVoteColor } from '@/lib/utils';

// ISR: Top-rated movies - revalidate every 7 days
export const revalidate = 604800; // 7 days

export const metadata = {
  title: 'Top Rated Movies - MoviesInfo',
  description: 'Discover the best rated movies of all time.',
  openGraph: {
    title: 'Top Rated Movies - MoviesInfo',
    description: 'Discover the best rated movies of all time.',
    type: 'website',
  },
};

async function TopRatedContent({ page = 1 }) {
  const moviesData = await discoverMovies({ page, sort_by: 'vote_average.desc', 'vote_count.gte': 500 });
  const movies = moviesData.results || [];
  const totalPages = moviesData.total_pages || 1;

  if (movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '30px' }}>
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}>
            <img
              alt={movie.title}
              src={getTMDBImageUrl(movie.poster_path, 'w500')}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ padding: '12px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>{movie.title}</h4>
              <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 8px 0' }}>
                {movie.release_date}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: getVoteColor(movie.vote_average),
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}
                >
                  {formatVotePercentage(movie.vote_average)}%
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
    <Pagination currentPage={page} totalPages={totalPages} baseUrl="/movies/top-rated" />
    </>
  );
}

export default function TopRatedPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Top Rated Movies</h1>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#999' }}>Loading movies...</div>}>
        <TopRatedContent page={page} />
      </Suspense>
    </div>
  );
}
