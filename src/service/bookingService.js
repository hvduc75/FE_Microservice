import axios from '../utils/axiosCustomize';

const getBookingById = (bookingId) => {
    return axios.get(`/booking/getBookingById/?bookingId=${bookingId}`);
};

const getAllBookingByEventId = (eventId) => {
    return axios.get(`/booking/getAllBookingByEventId/?eventId=${eventId}`);
};

const createBooking = (data) => {
    const formData = new FormData();

    formData.append('eventId', data.eventId);
    formData.append('totalAmount', data.totalAmount);
    formData.append('tickets', JSON.stringify(data.tickets));

    return axios.post('/booking/create-booking', formData);
};

const updateReceiverInfo = (bookingId, receiverEmail, receiverPhone, receiverName) => {
    const formData = new FormData();

    formData.append('bookingId', bookingId);
    formData.append('receiverEmail', receiverEmail);
    formData.append('receiverPhone', receiverPhone);
    formData.append('receiverName', receiverName);

    return axios.put('/booking/update-receiverInfo', formData);
};

export { createBooking, getBookingById, updateReceiverInfo, getAllBookingByEventId };
