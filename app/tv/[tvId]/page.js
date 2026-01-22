import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CastCarousel from '@/components/CastCarousel';
import TVCarousel from '@/components/TVCarousel';
import { 
  getTVDetails, 
  getTVCredits,
  getTVRecommendations,
} from '@/lib/tmdbClient';
import { 
  getTMDBImageUrl, 
  formatDate, 
  formatVotePercentage,
  getVoteColor,
  truncateText
} from '@/lib/utils';

export async function generateMetadata({ params }) {
  try {
    const tvId = params.tvId;
    const tv = await getTVDetails(tvId);

    if (!tv || tv.status_code === 34) {
      return {
        title: 'TV Show Not Found',
      };
    }

    return {
      title: `${tv.name} - MoviesInfo`,
      description: truncateText(tv.overview, 160),
      openGraph: {
        title: tv.name,
        description: tv.overview,
        images: tv.poster_path ? [
          {
            url: getTMDBImageUrl(tv.poster_path, 'w500'),
            width: 500,
            height: 750,
          },
        ] : [],
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'TV Show Details',
    };
  }
}

async function TVShowDetails({ tvId }) {
  try {
    // Fetch main data first
    const tv = await getTVDetails(tvId).catch(err => {
      console.error(`Error fetching TV show ${tvId}:`, err);
      throw err;
    });

    if (!tv || tv.status_code === 34) {
      notFound();
    }

    // Fetch additional data in parallel with fallbacks
    const [credits, recommendationsData] = await Promise.all([
      getTVCredits(tvId).catch(err => {
        console.error(`Error fetching credits for TV show ${tvId}:`, err);
        return { cast: [] };
      }),
      getTVRecommendations(tvId).catch(err => {
        console.error(`Error fetching recommendations for TV show ${tvId}:`, err);
        return { results: [] };
      }),
    ]);

    const cast = credits?.cast?.slice(0, 6) || [];
    const recommendations = recommendationsData?.results?.filter(show => show.poster_path) || [];

    // Defensive checks for required data
    if (!tv.name) {
      console.error('TV show name is missing:', tv);
      notFound();
    }

    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '40px' }}>
          {/* Poster */}
          <div>
            {tv.poster_path ? (
              <img
                alt={tv.name}
                src={getTMDBImageUrl(tv.poster_path, 'w500')}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            ) : (
              <div style={{ width: '100%', height: '500px', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#999' }}>No poster available</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1>{tv.name}</h1>
            
            {tv.first_air_date && (
              <p><strong>First Air Date:</strong> {formatDate(tv.first_air_date)}</p>
            )}

            {tv.last_air_date && (
              <p><strong>Last Air Date:</strong> {formatDate(tv.last_air_date)}</p>
            )}

            {tv.number_of_seasons && (
              <p><strong>Seasons:</strong> {tv.number_of_seasons}</p>
            )}

            {tv.number_of_episodes && (
              <p><strong>Episodes:</strong> {tv.number_of_episodes}</p>
            )}

            {/* Genres */}
            {tv.genres?.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <strong>Genres:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {tv.genres.map(g => (
                    <span key={g.id} style={{ backgroundColor: '#1890ff', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem' }}>
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Rating */}
            <div style={{ marginBottom: '16px' }}>
              <strong>Rating:</strong>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: getVoteColor(tv.vote_average),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}>
                  {formatVotePercentage(tv.vote_average)}%
                </div>
                <span>User Score: {formatVotePercentage(tv.vote_average)}%</span>
              </div>
            </div>

            {/* Overview */}
            {tv.overview && (
              <div>
                <h3>Overview</h3>
                <p>{tv.overview}</p>
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

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div style={{ marginBottom: '40px', margin: '40px auto 0' }}>
            <h2 style={{ marginBottom: '20px' }}>Recommended TV Shows</h2>
            <TVCarousel shows={recommendations.slice(0, 18)} showRating={true} />
          </div>
        )}
      </div>
    );
  } catch (error) {
    throw error;
  }
}

export default function TVShowDetailPage({ params }) {
  const { tvId } = params;

  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#999' }}>Loading TV show details...</div>}>
      <TVShowDetails tvId={tvId} />
    </Suspense>
  );
}

// For Netlify: Pre-generate popular TV shows at build time
export async function generateStaticParams() {
  try {
    const { discoverTV } = await import('@/lib/tmdbClient');
    
    // Fetch popular TV shows to pre-generate pages
    const tvData = await discoverTV({ page: 1 });
    const shows = tvData.results || [];
    
    // Generate params for the first 20 popular TV shows
    return shows.slice(0, 20).map((show) => ({
      tvId: String(show.id),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Use ISR with revalidation - pages revalidate every 24 hours
export const revalidate = 86400; // 24 hours
export const dynamicParams = true; // Allow dynamic params for pages not pre-generated
