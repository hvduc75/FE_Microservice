import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { checkTokenLogin } from '../../service/authService';
import { UserLoginSuccess, OpenLoginModal } from '../../redux/action/userAction';

function CodePage() {
    const { userId, tokenLogin } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            let response = await checkTokenLogin(userId, tokenLogin);
            if (response && +response.EC === 0) {
                dispatch(UserLoginSuccess(response));
                dispatch(OpenLoginModal(false));

                if (response.DT.role === 'User') {
                    navigate(-2);
                } else {
                    navigate('/admin');
                }
            }
        };
        fetchData();
    }, []);
    return <div></div>;
}

export default CodePage;
