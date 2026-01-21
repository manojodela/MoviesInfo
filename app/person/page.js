import { Suspense } from 'react';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import { getTrendingPeople } from '@/lib/tmdbClient';
import { getTMDBImageUrl } from '@/lib/utils';

// SSR: Disable caching - render on every request for fresh trending data
export const revalidate = 0;

export const metadata = {
  title: 'Trending People - MoviesInfo',
  description: 'Discover trending actors, directors, and entertainment personalities.',
  openGraph: {
    title: 'Trending People - MoviesInfo',
    description: 'Discover trending actors, directors, and entertainment personalities.',
    type: 'website',
  },
};

async function PeopleContent({ page = 1 }) {
  const data = await getTrendingPeople('day', page);
  const people = data.results || [];
  const totalPages = data.total_pages || 1;

  if (people.length === 0) {
    return <div>No people found.</div>;
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '30px' }}>
        {people.map((person) => (
          <Link key={person.id} href={`/person/${person.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}>
              <img
                alt={person.name}
                src={getTMDBImageUrl(person.profile_path, 'w500')}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '12px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>{person.name}</h4>
                <p style={{ fontSize: '0.9rem', color: '#666', margin: '0' }}>
                  {person.known_for_department}
                </p>
                {person.known_for && person.known_for.length > 0 && (
                  <p style={{ fontSize: '0.8rem', color: '#999', margin: '8px 0 0 0' }}>
                    Known for: {person.known_for.map(k => k.title || k.name).join(', ')}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/person" />
    </>
  );
}

export default function PeoplePage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Trending People</h1>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#999' }}>Loading people...</div>}>
        <PeopleContent page={page} />
      </Suspense>
    </div>
  );
}
