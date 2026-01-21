'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Carousel.module.css';

export default function Carousel({ items, renderItem, itemsPerPage = 6 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = itemsPerPage;
  const totalPages = Math.ceil(items.length / itemsToShow);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const startIndex = currentIndex * itemsToShow;
  const visibleItems = items.slice(startIndex, startIndex + itemsToShow);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <button 
          className={styles.prevButton} 
          onClick={goToPrevious}
          aria-label="Previous items"
        >
          ‹
        </button>

        <div className={styles.itemsGrid}>
          {visibleItems.map((item, idx) => (
            <div key={`${item.id}-${startIndex + idx}`} className={styles.item}>
              {renderItem(item)}
            </div>
          ))}
        </div>

        <button 
          className={styles.nextButton} 
          onClick={goToNext}
          aria-label="Next items"
        >
          ›
        </button>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === currentIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
