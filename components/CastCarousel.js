'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getTMDBImageUrl } from '@/lib/utils';
import styles from '@/styles/Carousel.module.css';

export default function CastCarousel({ castMembers }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(castMembers.length / itemsPerPage);
  const displayedMembers = castMembers.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0 ? Math.max(0, castMembers.length - itemsPerPage) : prev - itemsPerPage
    );
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < castMembers.length) {
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index * itemsPerPage);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <button
          className={styles.prevButton}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          title="Previous cast members"
        >
          ←
        </button>

        <div className={styles.itemsGrid}>
          {displayedMembers.map((member) => (
            <Link
              key={member.id}
              href={`/person/${member.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                className={styles.item}
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  overflow: 'hidden', 
                  cursor: 'pointer', 
                  transition: 'transform 0.2s',
                }} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {member.profile_path ? (
                  <img
                    alt={member.name}
                    src={getTMDBImageUrl(member.profile_path, 'w500')}
                    style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '250px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.9rem' }}>
                    No Image
                  </div>
                )}
                <div style={{ padding: '12px' }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>{member.name}</h4>
                  <p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>{member.character || 'N/A'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          className={styles.nextButton}
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= castMembers.length}
          title="Next cast members"
        >
          →
        </button>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index * itemsPerPage === currentIndex ? styles.active : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to cast page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
