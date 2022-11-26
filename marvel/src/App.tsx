import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

const App: React.FC = () => {
  const element = useRoutes(routes);

  return <div className="App">{element}</div>;
};

export default App;
