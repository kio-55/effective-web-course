import type { RouteObject } from 'react-router-dom';

import Layout from '../layouts/Layout';
import NoMatch from './NoMatch';
import Home from './Home';
import Characters from './Characters';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/characters',
        element: <Characters />
      },
      { path: '*', element: <NoMatch /> }
    ]
  }
];

export default routes;
