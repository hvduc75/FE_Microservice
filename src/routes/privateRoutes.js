import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { OpenLoginModal } from '../redux/action/userAction';

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const isFetchingAccount = useSelector((state) => state.user.isFetchingAccount);
    const isLoginModalOpen = useSelector((state) => state.user.isLoginModalOpen);

    useEffect(() => {
        if (!isAuthenticated && !isLoginModalOpen) {
            dispatch(OpenLoginModal(true));
        }
    }, [isAuthenticated, isLoginModalOpen, dispatch]);

    if (isFetchingAccount) {
        return <div></div>;
    }

    return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;
