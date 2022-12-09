import React from 'react';

import { Result } from 'antd';
import { ResultStatusType } from 'types/helpers';

type ErrorTypes = {
  error: ResultStatusType;
};

const Error: React.FC<ErrorTypes> = ({ error }: ErrorTypes) => {
  return (
    <Result
      status={error}
      title={error}
      subTitle="Sorry, something went wrong."
    />
  );
};

export default Error;
