import { Spin } from 'antd';

export default function TVLoading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Spin size="large" tip="Loading TV show details..." />
    </div>
  );
}
