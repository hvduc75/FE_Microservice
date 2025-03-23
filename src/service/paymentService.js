import axios from '../utils/axiosCustomize';

const paymentWithVnPay = (amount, orderId,  bankCode, language, expireDate) => {
    return axios.post('/payment/vnpay', {amount, orderId, bankCode, language, expireDate});
};

const vnpay_return = (paymentParams) => {
    return axios.get("/vnpay_return", {params: paymentParams})
}

const vnpay_refund = (orderId, transDate, amount, user) => {
    return axios.post("/vnpay/refund", {orderId, transDate, amount, user})
}

export { paymentWithVnPay, vnpay_return, vnpay_refund };
