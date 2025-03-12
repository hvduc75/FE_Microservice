import axios from '../utils/axiosCustomize';

const loginUser = (valueLogin, password) => {
    return axios.post('/customer/login', { valueLogin, password });
};

const getAccount = () => {
    return axios.get('/customer/account');
};

const checkTokenLogin = (userId, tokenLogin) => {
    return axios.get(`/checkTokenLogin?userId=${userId}&tokenLogin=${tokenLogin}`);
};

const registerNewUser = (userData) => {
    return axios.post('/customer/register', userData);
};

const logout = () => {
    return axios.post('/customer/logout');
};

const sendOtp = (email) => {
    return axios.post('/api/v1/auth/send-code', { email });
};

const resetPassword = (email, otp, password) => {
    return axios.post('/api/v1/auth/resetPassword', { email, otp, password });
};

export { loginUser, registerNewUser, logout, getAccount, checkTokenLogin, sendOtp, resetPassword };
