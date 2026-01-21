'use client';

import { Result, Button } from 'antd';

export default function MovieError({ error, reset }) {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Result
        status="error"
        title="Failed to Load Movie"
        subTitle={error?.message || 'Could not load movie details. Please try again.'}
        extra={
          <Button type="primary" onClick={() => reset()}>
            Try Again
          </Button>
        }
      />
    </div>
  );
}
