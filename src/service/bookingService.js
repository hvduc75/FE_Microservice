import axios from '../utils/axiosCustomize';

const getBookingById = (bookingId) => {
    return axios.get(`/booking/getBookingById/?bookingId=${bookingId}`);
};

const createBooking = (data) => {
    const formData = new FormData();

    formData.append('eventId', data.eventId);
    formData.append('totalAmount', data.totalAmount);
    formData.append('tickets', JSON.stringify(data.tickets));

    return axios.post('/booking/create-booking', formData);
};

export { createBooking, getBookingById };
