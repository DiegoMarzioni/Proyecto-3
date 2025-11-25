import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from '../../helpers/authHelpers';

const PublicRoute = ({ children }) => {
  return isUserLoggedIn() ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
