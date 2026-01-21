'use client';

import { useState, useEffect } from 'react';

/**
 * GenreFilter Component - CSR (Client-Side Rendering)
 * This component handles client-side filtering without server calls
 * All state and logic managed on client-side
 */

export default function GenreFilter() {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CSR: Fetch genres on client-side only
    const fetchGenres = async () => {
      try {
        // Mock genres for demo - in production, this would fetch real genres
        const mockGenres = [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
          { id: 16, name: 'Animation' },
          { id: 35, name: 'Comedy' },
          { id: 80, name: 'Crime' },
          { id: 18, name: 'Drama' },
          { id: 10751, name: 'Family' },
          { id: 14, name: 'Fantasy' },
        ];
        
        setGenres(mockGenres);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreToggle = (genreId) => {
    const updated = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    
    setSelectedGenres(updated);
    // CSR: All filtering happens client-side
    console.log('Client-side filtering - Selected genres:', updated);
  };

  if (loading) return <div style={{ marginBottom: '24px', color: '#999' }}>Loading genres...</div>;

  return (
    <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '12px', fontSize: '1rem' }}>Filter by Genre (CSR - Client-Side Rendering)</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreToggle(genre.id)}
            style={{
              padding: '6px 12px',
              border: selectedGenres.includes(genre.id) ? '2px solid #1890ff' : '1px solid #ddd',
              backgroundColor: selectedGenres.includes(genre.id) ? '#e6f7ff' : 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s',
              fontWeight: selectedGenres.includes(genre.id) ? '600' : '400',
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>
      {selectedGenres.length > 0 && (
        <p style={{ marginTop: '12px', color: '#666', fontSize: '0.9rem' }}>
          ✓ Selected: {selectedGenres.length} genre(s) - Filtering done client-side (no server calls)
        </p>
      )}
    </div>
  );
}
