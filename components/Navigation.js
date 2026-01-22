'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Navigation.module.css';

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);
  const [showTVDropdown, setShowTVDropdown] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link href="/" className={`navbar-brand ${styles.brand} text-white`}>
          MOVIESINFO
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <button 
                className="nav-link text-white dropdown-toggle bg-transparent border-0"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setShowMoviesDropdown(true)}
                onMouseLeave={() => setShowMoviesDropdown(false)}
              >
                Movies
              </button>
              {showMoviesDropdown && (
                <ul 
                  className="dropdown-menu show"
                  onMouseEnter={() => setShowMoviesDropdown(true)}
                  onMouseLeave={() => setShowMoviesDropdown(false)}
                  style={{ display: 'block' }}
                >
                  <li><Link className="dropdown-item" href="/movies">Popular</Link></li>
                  <li><Link className="dropdown-item" href="/movies/now-playing">Now Playing</Link></li>
                  <li><Link className="dropdown-item" href="/movies/upcoming">Upcoming</Link></li>
                  <li><Link className="dropdown-item" href="/movies/top-rated">Top Rated</Link></li>
                </ul>
              )}
            </li>
            <li className="nav-item dropdown">
              <button 
                className="nav-link text-white dropdown-toggle bg-transparent border-0"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setShowTVDropdown(true)}
                onMouseLeave={() => setShowTVDropdown(false)}
              >
                TV Shows
              </button>
              {showTVDropdown && (
                <ul 
                  className="dropdown-menu show"
                  onMouseEnter={() => setShowTVDropdown(true)}
                  onMouseLeave={() => setShowTVDropdown(false)}
                  style={{ display: 'block' }}
                >
                  <li><Link className="dropdown-item" href="/tv">Popular</Link></li>
                  <li><Link className="dropdown-item" href="/tv/airing-today">Airing Today</Link></li>
                  <li><Link className="dropdown-item" href="/tv/on-the-air">On The Air</Link></li>
                  <li><Link className="dropdown-item" href="/tv/top-rated">Top Rated</Link></li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <Link href="/person" className="nav-link text-white">People</Link>
            </li>
          </ul>

          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
