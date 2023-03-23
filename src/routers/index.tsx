import { useRoutes } from 'react-router-dom';

import { Navigate } from 'react-router-dom';

import Home from '@/views/Home';

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/home',
    element: <Home />,
  },
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
