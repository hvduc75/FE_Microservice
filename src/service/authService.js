import axios from '../utils/axiosCustomize';

const loginUser = (valueLogin, password) => {
    const formData = new FormData();

    formData.append('valueLogin', valueLogin);
    formData.append('password', password);
    return axios.post('/customer/login', formData);
};

const getAccount = () => {
    return axios.get('/customer/account');
};

const checkTokenLogin = (userId, tokenLogin) => {
    return axios.get(`/checkTokenLogin?userId=${userId}&tokenLogin=${tokenLogin}`);
};

const registerNewUser = (userData) => {
    const formData = new FormData();

    formData.append('email', userData.email);
    formData.append('password', userData.password);

    return axios.post('/customer/register', formData);
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
