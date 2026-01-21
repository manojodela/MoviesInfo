/**
 * Client-side utilities for the application
 */

/**
 * Debounce function for search inputs
 */
export function debounce(func, delay = 800) {
  let timeoutId;
  
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount) {
  if (!amount) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date string
 */
export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Get color based on vote average
 */
export function getVoteColor(voteAverage) {
  if (!voteAverage) return 'orange';
  const score = Math.round(voteAverage * 10);
  if (score >= 70) return 'green';
  if (score >= 50) return 'orange';
  return 'red';
}

/**
 * Format vote percentage
 */
export function formatVotePercentage(voteAverage) {
  if (!voteAverage) return 0;
  return Math.round(voteAverage * 10);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength = 150) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Build TMDB image URL
 */
export function getTMDBImageUrl(path, size = 'w500') {
  if (!path) return '/no-image.png';
  return `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${size}${path}`;
}

/**
 * Build profile image URL
 */
export function getProfileImageUrl(path) {
  if (!path) return '/no-image.png';
  return `${process.env.NEXT_PUBLIC_PROFILE_PATH}${path}`;
}
