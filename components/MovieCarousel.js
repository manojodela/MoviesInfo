'use client';

import Link from 'next/link';
import Carousel from '@/components/Carousel';
import { getTMDBImageUrl } from '@/lib/utils';

export default function MovieCarousel({ movies, showRating = false }) {
  return (
    <Carousel 
      items={movies}
      itemsPerPage={6}
      renderItem={(movie) => (
        <Link 
          href={`/movies/${movie.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{ cursor: 'pointer' }}>
            {movie.poster_path && (
              <img
                alt={movie.title}
                src={getTMDBImageUrl(movie.poster_path, 'w200')}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }}
              />
            )}
            <p style={{ fontSize: '0.95rem', fontWeight: '500', margin: '8px 0 4px 0' }}>
              {movie.title}
            </p>
            {movie.release_date && (
              <p style={{ fontSize: '0.85rem', color: '#666', margin: '0' }}>
                {new Date(movie.release_date).getFullYear()}
              </p>
            )}
            {showRating && movie.vote_average && (
              <p style={{ fontSize: '0.85rem', color: '#ff9500', margin: '4px 0 0 0', fontWeight: '500' }}>
                ⭐ {movie.vote_average.toFixed(1)}
              </p>
            )}
            {movie.character && (
              <p style={{ fontSize: '0.8rem', color: '#999', margin: '4px 0 0 0', fontStyle: 'italic' }}>
                as {movie.character}
              </p>
            )}
          </div>
        </Link>
      )}
    />
  );
}
