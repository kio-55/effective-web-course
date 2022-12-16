import React from 'react';
import { useTranslation } from 'react-i18next';

const NoMatch: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('page_not_found')}</h1>
    </div>
  );
};

export default NoMatch;
