import Home from '@/views/Home';
import ThreejsCanvas from '@/views/threejsDemo';
import Webgl2Canvas from '@/views/webgl2Demo';

import { useRoutes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/home',
    element: <Home />,
    children:[
      {
        path: 'threejsDemo',
        element: <ThreejsCanvas />,
      },
      {
        path: 'webgl2Demo',
        element: <Webgl2Canvas />,
      }
    ]
  },
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
