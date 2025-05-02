import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAccount } from './service/authService';
import { UserLoginSuccess } from './redux/action/userAction';
import { createSocketConnection } from './utils/socket';
import ModalLogin from './Components/Modal/ModalLogin/ModalLogin';
import AppRoutes from './routes';
import i18n from "./i18n";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.user.account);
    const isOpenModalLogin = useSelector((state) => state.user.isLoginModalOpen);
    const reduxLanguage = useSelector((state) => state.user.language);
    const [showModal, setShowModal] = useState(false);
    const language = localStorage.getItem("language") || reduxLanguage || "vi";
    const accessToken = user?.access_token;

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    useEffect(() => {
        if (isOpenModalLogin) {
            setShowModal(true);
        }
    }, [isOpenModalLogin]);

    useEffect(() => {
        if (user && !user.access_token) {
            fetchAccount();
        }
    }, [location.pathname]);

    useEffect(() => {
        if (accessToken) {
          createSocketConnection(accessToken);
        }
      }, [accessToken]);

    const fetchAccount = async () => {
        try {
            const response = await getAccount();
            if (response && +response.EC === 0) {
                dispatch(UserLoginSuccess(response));
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    return (
        <>
            {showModal && <ModalLogin setShowModal={setShowModal} />}
            <AppRoutes />
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
}

export default App;
