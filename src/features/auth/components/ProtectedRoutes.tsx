import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/auth';

const ProtectedRoutes = () => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" state={{ from: location }} replace={true} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
