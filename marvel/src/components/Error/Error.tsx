import React from 'react';

import { Result } from 'antd';
import { ResultStatusType } from 'types/helpers';
import { useTranslation } from 'react-i18next';

type ErrorTypes = {
  error: ResultStatusType;
};

const Error: React.FC<ErrorTypes> = ({ error }: ErrorTypes) => {
  const { t } = useTranslation();
  return <Result status={error} title={error} subTitle={t('error')} />;
};

export default Error;
