import { Suspense } from 'react';
import Link from 'next/link';
import { discoverMovies, discoverTV, getTrendingPeople } from '@/lib/tmdbClient';
import { getTMDBImageUrl, formatVotePercentage } from '@/lib/utils';

// ISR: Static Generation for homepage - regenerate every 24 hours
export const revalidate = 86400; // 24 hours

export const metadata = {
  title: 'MoviesInfo - Discover Movies & TV Shows',
  description: 'Your go-to source for movies, TV shows, and entertainment information powered by TMDB.',
};

async function PopularMoviesContent() {
  const data = await discoverMovies({ page: 1 });
  const movies = data.results?.slice(0, 6) || [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}>
            <img
              alt={movie.title}
              src={getTMDBImageUrl(movie.poster_path, 'w500')}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <div style={{ padding: '12px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>{movie.title}</h4>
              <p style={{ color: '#666', margin: '0', fontSize: '0.85rem' }}>
                {formatVotePercentage(movie.vote_average)}% • {movie.release_date}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

async function PopularTVContent() {
  const data = await discoverTV({ page: 1 });
  const shows = data.results?.slice(0, 6) || [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {shows.map((show) => (
        <Link key={show.id} href={`/tv/${show.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}>
            <img
              alt={show.name}
              src={getTMDBImageUrl(show.poster_path, 'w500')}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <div style={{ padding: '12px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>{show.name}</h4>
              <p style={{ color: '#666', margin: '0', fontSize: '0.85rem' }}>
                {formatVotePercentage(show.vote_average)}% • {show.first_air_date}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

async function TrendingPeopleContent() {
  const data = await getTrendingPeople('day');
  const people = data.results?.slice(0, 6) || [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {people.map((person) => (
        <Link key={person.id} href={`/person/${person.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}>
            <img
              alt={person.name}
              src={getTMDBImageUrl(person.profile_path, 'w500')}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <div style={{ padding: '12px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>{person.name}</h4>
              <p style={{ color: '#666', margin: '0', fontSize: '0.85rem' }}>
                {person.known_for_department}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Welcome to MoviesInfo</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Discover movies, TV shows, and entertainment information
        </p>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2>Popular Movies</h2>
          <Link href="/movies" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 16px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              View All →
            </button>
          </Link>
        </div>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#999' }}>Loading popular movies...</div>}>
          <PopularMoviesContent />
        </Suspense>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2>Popular TV Shows</h2>
          <Link href="/tv" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 16px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              View All →
            </button>
          </Link>
        </div>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#999' }}>Loading popular TV shows...</div>}>
          <PopularTVContent />
        </Suspense>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2>Trending People</h2>
          <Link href="/person" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '8px 16px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              View All →
            </button>
          </Link>
        </div>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#999' }}>Loading trending people...</div>}>
          <TrendingPeopleContent />
        </Suspense>
      </div>
    </div>
  );
}
