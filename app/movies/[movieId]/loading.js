import { Spin } from 'antd';

export default function MovieLoading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Spin size="large" tip="Loading movie details..." />
    </div>
  );
}
