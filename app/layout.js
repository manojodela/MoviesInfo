import { Suspense } from 'react';
import '@/styles/globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'MoviesInfo - Discover Movies & TV Shows',
  description: 'Discover popular movies, TV shows, and trending people with detailed information, reviews, and ratings.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://moviesinfo.com',
    siteName: 'MoviesInfo',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap for navbar */}
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" 
          rel="stylesheet"
        />
      </head>
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Suspense fallback={<div className="navbar navbar-dark bg-dark"><div className="container-fluid">Loading...</div></div>}>
            <Navigation />
          </Suspense>
          
          <main style={{ flex: 1, padding: '20px' }}>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>

        {/* Bootstrap JS for navbar */}
        <script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
          defer
        />
      </body>
    </html>
  );
}
