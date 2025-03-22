import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoutes = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const user = useSelector((state) => state.user.account);
    const isFetchingAccount = useSelector((state) => state.user.isFetchingAccount);

    if (isFetchingAccount) {
        return <div></div>;
    }

    return isAuthenticated && user.role === "Admin" ? <Outlet /> : <Navigate to="/not-found" replace />;
};

export default AdminRoutes;
