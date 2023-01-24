import { Navigate } from 'react-router-dom';
import { viewTokenTypes } from './constants/constants';
import UserLayout from './layout/UserLayout';
import Login from './screens/Login/Login';
import ViewToken from './screens/ViewToken/ViewToken';
import Wallet from './screens/Wallet';

const routes: any = [
  {
    path: '/token/:tokenId',
    element: <ViewToken viewTokenType={viewTokenTypes.PUBLIC_TOKEN} />,
  },
  {
    path: '/shared/:shareHash',
    element: <ViewToken viewTokenType={viewTokenTypes.SHARED_TOKEN} />,
  },
  {
    path: '/token-login',
    element: <Login />,
  },
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { path: '/wallet', element: <Wallet /> },
      {
        path: '/digital-twin-detail/:tokenId',
        element: <ViewToken viewTokenType={viewTokenTypes.OWNED_TOKEN} />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/token-login' replace />,
  },
];

export default routes;
