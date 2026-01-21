'use client';

import Link from 'next/link';
import styles from '@/styles/Pagination.module.css';

export default function Pagination({ currentPage, totalPages, baseUrl }) {
  const pageNumbers = [];
  const maxPagesToShow = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link href={`${baseUrl}?page=${currentPage - 1}`} className={styles.button}>
          ← Previous
        </Link>
      )}

      {/* Page Numbers */}
      <div className={styles.pageNumbers}>
        {startPage > 1 && (
          <>
            <Link href={`${baseUrl}?page=1`} className={styles.pageNumber}>
              1
            </Link>
            {startPage > 2 && <span className={styles.ellipsis}>...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
          >
            {page}
          </Link>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className={styles.ellipsis}>...</span>}
            <Link href={`${baseUrl}?page=${totalPages}`} className={styles.pageNumber}>
              {totalPages}
            </Link>
          </>
        )}
      </div>

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link href={`${baseUrl}?page=${currentPage + 1}`} className={styles.button}>
          Next →
        </Link>
      )}

      {/* Page Info */}
      <div className={styles.info}>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
