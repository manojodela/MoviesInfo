import { notFound } from 'next/navigation';
import { Result } from 'antd';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Result
        status="404"
        title="Page Not Found"
        subTitle="The page you're looking for doesn't exist."
      />
    </div>
  );
}
