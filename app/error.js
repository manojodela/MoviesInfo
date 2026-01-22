'use client';

import { useEffect } from 'react';
import { Result, Button } from 'antd';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error for debugging
    console.error('Error Boundary:', error);
  }, [error]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Result
        status="500"
        title="Something went wrong"
        subTitle={error?.message || 'An unexpected error occurred. Please try again.'}
        extra={
          <Button type="primary" onClick={() => reset()}>
            Try Again
          </Button>
        }
      />
      {process.env.NODE_ENV === 'development' && error && (
        <div style={{ marginTop: '40px', textAlign: 'left', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '4px', maxWidth: '600px', margin: '40px auto' }}>
          <p><strong>Error Details:</strong></p>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '12px' }}>
            {error.toString()}
          </pre>
        </div>
      )}
    </div>
  );
}
