import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { OpenLoginModal } from '../redux/action/userAction';

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const isFetchingAccount = useSelector((state) => state.user.isFetchingAccount);
    const isLoginModalOpen = useSelector((state) => state.user.isLoginModalOpen);
    const user = useSelector((state) => state.user.account);

    useEffect(() => {
        if(!isFetchingAccount){
            if (!isAuthenticated  && !isLoginModalOpen) {
                dispatch(OpenLoginModal(true));
            }
        }
    }, [isAuthenticated, isFetchingAccount, isLoginModalOpen, dispatch]);    

    if (isFetchingAccount) {
        return <div></div>;
    }

    // return isAuthenticated ? <Outlet /> : null;
    return isAuthenticated && user.role === "User" ? <Outlet /> : <Navigate to="/not-found" replace />;
};

export default PrivateRoute;
