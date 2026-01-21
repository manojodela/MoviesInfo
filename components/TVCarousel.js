'use client';

import Link from 'next/link';
import Carousel from '@/components/Carousel';
import { getTMDBImageUrl } from '@/lib/utils';

export default function TVCarousel({ shows, showRating = false }) {
  return (
    <Carousel 
      items={shows}
      itemsPerPage={6}
      renderItem={(show) => (
        <Link 
          href={`/tv/${show.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{ cursor: 'pointer' }}>
            {show.poster_path && (
              <img
                alt={show.name}
                src={getTMDBImageUrl(show.poster_path, 'w200')}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }}
              />
            )}
            <p style={{ fontSize: '0.95rem', fontWeight: '500', margin: '8px 0 4px 0' }}>
              {show.name}
            </p>
            {show.first_air_date && (
              <p style={{ fontSize: '0.85rem', color: '#666', margin: '0' }}>
                {new Date(show.first_air_date).getFullYear()}
              </p>
            )}
            {showRating && show.vote_average && (
              <p style={{ fontSize: '0.85rem', color: '#ff9500', margin: '4px 0 0 0', fontWeight: '500' }}>
                ⭐ {show.vote_average.toFixed(1)}
              </p>
            )}
          </div>
        </Link>
      )}
    />
  );
}
