import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const isAuth = false; // Always false for now - will be implemented later

  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
