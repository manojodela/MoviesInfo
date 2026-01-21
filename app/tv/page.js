import { Suspense } from 'react';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import GenreFilter from '@/components/GenreFilter';
import { discoverTV } from '@/lib/tmdbClient';
import { getTMDBImageUrl, formatVotePercentage, getVoteColor } from '@/lib/utils';

// SSR: Disable caching - render on every request for fresh data
export const revalidate = 0;

export const metadata = {
  title: 'Popular TV Shows - MoviesInfo',
  description: 'Discover popular TV shows and find your next favorite series.',
  openGraph: {
    title: 'Popular TV Shows - MoviesInfo',
    description: 'Discover popular TV shows and find your next favorite series.',
    type: 'website',
  },
};

async function TVShowsContent({ page = 1 }) {
  const tvData = await discoverTV({ page });
  const shows = tvData.results || [];
  const totalPages = tvData.total_pages || 1;

  if (shows.length === 0) {
    return <div>No TV shows found.</div>;
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '30px' }}>
        {shows.map((show) => (
          <Link key={show.id} href={`/tv/${show.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}>
              <img
                alt={show.name}
                src={getTMDBImageUrl(show.poster_path, 'w500')}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '12px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>{show.name}</h4>
                <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 8px 0' }}>
                  {show.first_air_date}
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
                      backgroundColor: getVoteColor(show.vote_average),
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}
                  >
                    {formatVotePercentage(show.vote_average)}%
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/tv" />
    </>
  );
}

export default function TVShowsPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>Popular TV Shows</h1>
      
      {/* CSR: Genre Filter Component - Client-side rendering */}
      <GenreFilter />
      
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#999' }}>Loading TV shows...</div>}>
        <TVShowsContent page={page} />
      </Suspense>
    </div>
  );
}
