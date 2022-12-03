declare let process: {
  env: {
    REACT_APP_CURRENT_YEAR: string;
    REACT_APP_BASE_URL: string;
    REACT_APP_PUBLIC_KEY: string;
    REACT_APP_PRIVATE_KEY: string;
  };
};

export default {
  currYear: process.env.REACT_APP_CURRENT_YEAR,
  baseUrl: process.env.REACT_APP_BASE_URL,
  publicKey: process.env.REACT_APP_PUBLIC_KEY,
  privateKey: process.env.REACT_APP_PRIVATE_KEY
};
