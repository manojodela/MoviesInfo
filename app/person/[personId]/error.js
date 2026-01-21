'use client';

import { Result, Button } from 'antd';

export default function PersonError({ error, reset }) {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Result
        status="error"
        title="Failed to Load Person Details"
        subTitle={error?.message || 'Could not load person information. Please try again.'}
        extra={
          <Button type="primary" onClick={() => reset()}>
            Try Again
          </Button>
        }
      />
    </div>
  );
}
