'use client';

import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter style={{ textAlign: 'center', marginTop: 'auto' }}>
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
      <p>© {currentYear} MoviesInfo. All rights reserved.</p>
    </AntFooter>
  );
}
