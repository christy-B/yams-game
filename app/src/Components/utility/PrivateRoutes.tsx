import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
