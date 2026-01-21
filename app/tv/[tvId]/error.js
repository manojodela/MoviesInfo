'use client';

import { Result, Button } from 'antd';

export default function TVError({ error, reset }) {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Result
        status="error"
        title="Failed to Load TV Show"
        subTitle={error?.message || 'Could not load TV show details. Please try again.'}
        extra={
          <Button type="primary" onClick={() => reset()}>
            Try Again
          </Button>
        }
      />
    </div>
  );
}
