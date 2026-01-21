'use client';

import { Result, Button } from 'antd';

export default function Error({ error, reset }) {
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
    </div>
  );
}
