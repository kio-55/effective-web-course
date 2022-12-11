import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingCard: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={240}
      height={400}
      viewBox="0 0 240 400"
      backgroundColor="#c0c0c0"
      foregroundColor="#1890ff"
    >
      <rect x="0" y="0" rx="0" ry="0" width="240" height="240" />
      <rect x="0" y="260" rx="21" ry="21" width="240" height="40" />
      <rect x="0" y="311" rx="6" ry="6" width="240" height="15" />
      <rect x="0" y="334" rx="6" ry="6" width="240" height="15" />
      <rect x="0" y="357" rx="6" ry="6" width="240" height="15" />
      <rect x="0" y="380" rx="6" ry="6" width="240" height="15" />
    </ContentLoader>
  );
};

export default LoadingCard;
