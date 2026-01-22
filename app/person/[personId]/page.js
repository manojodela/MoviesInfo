import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPersonDetails, getPersonCredits, getMovieRecommendations } from '@/lib/tmdbClient';
import { getTMDBImageUrl, formatDate } from '@/lib/utils';
import MovieCarousel from '@/components/MovieCarousel';

export async function generateMetadata({ params }) {
  try {
    const personId = params.personId;
    const person = await getPersonDetails(personId);

    if (!person || person.status_code === 34) {
      return {
        title: 'Person Not Found',
      };
    }

    return {
      title: `${person.name} - MoviesInfo`,
      description: person.biography ? person.biography.substring(0, 160) : `Information about ${person.name}`,
      openGraph: {
        title: person.name,
        description: person.biography,
        images: person.profile_path ? [
          {
            url: getTMDBImageUrl(person.profile_path, 'w500'),
            width: 500,
            height: 750,
          },
        ] : [],
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Person Details',
    };
  }
}

async function PersonDetails({ personId }) {
  try {
    const person = await getPersonDetails(personId);

    if (!person || person.status_code === 34) {
      notFound();
    }

    // Get person's credits
    let credits = null;
    let recommendations = [];
    try {
      const creditsData = await getPersonCredits(personId);
      credits = creditsData;

      // Get recommendations based on top movie they appeared in
      if (creditsData.cast && creditsData.cast.length > 0) {
        const topMovie = creditsData.cast
          .filter(m => m.media_type === 'movie' && m.id)
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))[0];
        
        if (topMovie) {
          try {
            const recData = await getMovieRecommendations(topMovie.id);
            recommendations = recData.results || [];
          } catch (e) {
            console.log('Could not fetch recommendations');
          }
        }
      }
    } catch (e) {
      console.log('Could not fetch credits');
    }

    // Get all movies from credits, sorted by popularity
    const movies = credits && credits.cast 
      ? credits.cast
          .filter(item => item.media_type === 'movie' && item.id && item.poster_path)
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      : [];

    return (
      <div style={{ width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '40px' }}>
          {/* Profile Image */}
          <div>
            {person.profile_path && (
              <img
                alt={person.name}
                src={getTMDBImageUrl(person.profile_path, 'w500')}
                style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 24px #0002' }}
              />
            )}
          </div>

          {/* Details */}
          <div>
            <h1 style={{ fontSize: '2.2rem', marginBottom: 8 }}>{person.name}</h1>

            {person.known_for_department && (
              <p style={{ fontSize: '1.1rem', margin: 0 }}><strong>Known For:</strong> {person.known_for_department}</p>
            )}

            {person.birthday && (
              <p style={{ fontSize: '1.05rem', margin: 0 }}><strong>Birthday:</strong> {formatDate(person.birthday)}</p>
            )}

            {person.place_of_birth && (
              <p style={{ fontSize: '1.05rem', margin: 0 }}><strong>Place of Birth:</strong> {person.place_of_birth}</p>
            )}

            {person.also_known_as && person.also_known_as.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <strong>Also Known As:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {person.also_known_as.map((name, idx) => (
                    <span key={idx} style={{ backgroundColor: '#f0f0f0', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem' }}>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {person.biography && (
              <div>
                <h3 style={{ margin: '18px 0 8px 0' }}>Biography</h3>
                <p style={{ lineHeight: 1.6 }}>{person.biography}</p>
              </div>
            )}
          </div>
        </div>

        {/* Movies Worked For Section */}
        {movies.length > 0 && (
          <div style={{ marginBottom: '48px', margin: '48px auto 0' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.6rem', letterSpacing: 0.5 }}>Movies Worked For</h2>
            <MovieCarousel
              movies={movies.map(movie => ({
                ...movie,
                // Add fallback for missing character
                character: movie.character || movie.job || '',
              }))}
              showRating={false}
            />
            <div style={{ fontSize: '0.95rem', color: '#888', marginTop: 8 }}>
              Showing {movies.length} movies
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div style={{ marginBottom: '40px',  margin: '40px auto 0' }}>
            <h2 style={{ marginBottom: '20px' }}>Recommended Movies</h2>
            <MovieCarousel movies={recommendations.slice(0, 20)} showRating={true} />
          </div>
        )}
      </div>
    );
  } catch (error) {
    throw error;
  }
}

export default function PersonDetailPage({ params }) {
  const { personId } = params;

  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem', color: '#999' }}>Loading person details...</div>}>
      <PersonDetails personId={personId} />
    </Suspense>
  );
}

// ISR - Cache for 24 hours
export const revalidate = 86400;
