import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CastCarousel from '@/components/CastCarousel';
import { 
  getMovieDetails, 
  getMovieCredits, 
  getMovieKeywords,
  getMovieRecommendations 
} from '@/lib/tmdbClient';
import { 
  getTMDBImageUrl, 
  formatDate, 
  formatCurrency,
  formatVotePercentage,
  getVoteColor,
  truncateText
} from '@/lib/utils';

export async function generateMetadata({ params }) {
  try {
    const movieId = params.movieId;
    const movie = await getMovieDetails(movieId);

    if (!movie || movie.status_code === 34) {
      return {
        title: 'Movie Not Found',
      };
    }

    return {
      title: `${movie.title} - MoviesInfo`,
      description: truncateText(movie.overview, 160),
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.poster_path ? [
          {
            url: getTMDBImageUrl(movie.poster_path, 'w500'),
            width: 500,
            height: 750,
          },
        ] : [],
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Movie Details',
    };
  }
}

async function MovieDetails({ movieId }) {
  try {
    // Validate movieId format
    if (!movieId || isNaN(movieId)) {
      console.error('Invalid movieId:', movieId);
      notFound();
    }

    // Fetch all data with individual error handling for debugging
    const movie = await getMovieDetails(movieId).catch(err => {
      console.error(`Error fetching movie ${movieId}:`, err);
      throw err;
    });

    if (!movie || movie.status_code === 34) {
      notFound();
    }

    // Fetch other data in parallel, but don't fail if they error
    const [credits, keywords, recommendations] = await Promise.all([
      getMovieCredits(movieId).catch(err => {
        console.error(`Error fetching credits for movie ${movieId}:`, err);
        return { cast: [], crew: [] };
      }),
      getMovieKeywords(movieId).catch(err => {
        console.error(`Error fetching keywords for movie ${movieId}:`, err);
        return { keywords: [] };
      }),
      getMovieRecommendations(movieId).catch(err => {
        console.error(`Error fetching recommendations for movie ${movieId}:`, err);
        return { results: [] };
      }),
    ]);

    const directors = credits?.crew?.filter(c => c.job === 'Director').map(d => d.name) || [];
    const writers = credits?.crew?.filter(c => c.job === 'Writer').map(w => w.name) || [];
    const cast = credits?.cast?.slice(0, 6) || [];

    // Defensive checks for required data
    if (!movie.title) {
      console.error('Movie title is missing:', movie);
      notFound();
    }

    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', marginBottom: '50px' }}>
          {/* Poster */}
          <div>
            {movie.poster_path ? (
              <img
                alt={movie.title}
                src={getTMDBImageUrl(movie.poster_path, 'w500')}
                style={{ width: '100%', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
              />
            ) : (
              <div style={{ width: '100%', height: '500px', backgroundColor: '#f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#999' }}>No poster available</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.2' }}>{movie.title}</h1>
            {movie.tagline && (
              <p style={{ fontSize: '1.1rem', color: '#666', fontStyle: 'italic', marginBottom: '24px' }}>{movie.tagline}</p>
            )}

            {/* Rating Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: getVoteColor(movie.vote_average),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.8rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                {formatVotePercentage(movie.vote_average)}%
              </div>
              <div>
                <p style={{ fontSize: '1rem', fontWeight: '600', margin: '0 0 4px 0' }}>User Score</p>
                <p style={{ fontSize: '0.9rem', color: '#666', margin: '0' }}>{movie.vote_count?.toLocaleString()} votes</p>
              </div>
            </div>

            {/* Key Info Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '20px', 
              marginBottom: '28px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              {movie.release_date && (
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#666', fontWeight: '500', margin: '0 0 4px 0' }}>Release Date</p>
                  <p style={{ fontSize: '1rem', fontWeight: '600', margin: '0' }}>{formatDate(movie.release_date)}</p>
                </div>
              )}

              {movie.runtime && (
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#666', fontWeight: '500', margin: '0 0 4px 0' }}>Runtime</p>
                  <p style={{ fontSize: '1rem', fontWeight: '600', margin: '0' }}>{movie.runtime} minutes</p>
                </div>
              )}

              {movie.status && (
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#666', fontWeight: '500', margin: '0 0 4px 0' }}>Status</p>
                  <p style={{ fontSize: '1rem', fontWeight: '600', margin: '0' }}>{movie.status}</p>
                </div>
              )}

              {movie.original_language && (
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#666', fontWeight: '500', margin: '0 0 4px 0' }}>Language</p>
                  <p style={{ fontSize: '1rem', fontWeight: '600', margin: '0', textTransform: 'uppercase' }}>{movie.original_language}</p>
                </div>
              )}
            </div>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Genres</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {movie.genres.map(g => (
                    <span key={g.id} style={{ backgroundColor: '#1890ff', color: 'white', padding: '6px 14px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500' }}>
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Budget and Revenue */}
            {(movie.budget || movie.revenue) && (
              <div style={{ 
                padding: '16px',
                backgroundColor: '#e6f7ff',
                borderLeft: '4px solid #1890ff',
                borderRadius: '4px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {movie.budget > 0 && (
                    <div>
                      <p style={{ fontSize: '0.85rem', color: '#0050b3', fontWeight: '500', margin: '0 0 4px 0' }}>Budget</p>
                      <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1890ff', margin: '0' }}>{formatCurrency(movie.budget)}</p>
                    </div>
                  )}
                  {movie.revenue > 0 && (
                    <div>
                      <p style={{ fontSize: '0.85rem', color: '#0050b3', fontWeight: '500', margin: '0 0 4px 0' }}>Revenue</p>
                      <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1890ff', margin: '0' }}>{formatCurrency(movie.revenue)}</p>
                    </div>
                  )}
                </div>
                {movie.budget > 0 && movie.revenue > 0 && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(24, 144, 255, 0.2)' }}>
                    <p style={{ fontSize: '0.85rem', color: '#0050b3', fontWeight: '500', margin: '0 0 4px 0' }}>Profit/Loss</p>
                    <p style={{ fontSize: '1rem', fontWeight: '600', color: movie.revenue - movie.budget > 0 ? '#52c41a' : '#ff4d4f', margin: '0' }}>
                      {formatCurrency(movie.revenue - movie.budget)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Overview */}
            {movie.overview && (
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '12px' }}>Overview</h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#444' }}>{movie.overview}</p>
              </div>
            )}
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h3>Cast</h3>
            {credits.cast?.length > 0 && (
              <Suspense fallback={<div>Loading cast...</div>}>
                <CastCarousel castMembers={credits.cast} />
              </Suspense>
            )}
          </div>
        )}

        {/* Credits */}
        {(directors.length > 0 || writers.length > 0) && (
          <div style={{ marginBottom: '40px' }}>
            <h3>Credits</h3>
            {directors.length > 0 && (
              <p><strong>Director:</strong> {directors.join(', ')}</p>
            )}
            {writers.length > 0 && (
              <p><strong>Writers:</strong> {writers.join(', ')}</p>
            )}
          </div>
        )}

        {/* Keywords */}
        {keywords.keywords?.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h3>Keywords</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {keywords.keywords.map(kw => (
                <span key={kw.id} style={{ backgroundColor: '#e6f7ff', color: '#0050b3', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem' }}>
                  {kw.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.results?.length > 0 && (
          <div>
            <h3>Recommendations</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              {recommendations.results.slice(0, 6).map(rec => (
                <Link key={rec.id} href={`/movies/${rec.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}>
                    <img
                      alt={rec.title}
                      src={getTMDBImageUrl(rec.poster_path, 'w500')}
                      style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '12px' }}>
                      <h4 style={{ margin: '0', fontSize: '0.95rem' }}>{rec.title}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    throw error;
  }
}

export default function MovieDetailPage({ params }) {
  const { movieId } = params;

  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#999' }}>Loading movie details...</div>}>
      <MovieDetails movieId={movieId} />
    </Suspense>
  );
}

// Allow dynamic params for any movie ID
export async function generateStaticParams() {
  // Return empty array to allow all movie IDs dynamically
  return [];
}

// Use on-demand ISR - revalidate after 24 hours
export const revalidate = 86400;
export const dynamicParams = true;
