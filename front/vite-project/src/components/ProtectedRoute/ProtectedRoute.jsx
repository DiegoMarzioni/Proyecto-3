import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from '../../helpers/authHelpers';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = isUserLoggedIn();
    
    if (!isAuthenticated) {
        
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;
