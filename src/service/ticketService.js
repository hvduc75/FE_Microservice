import axios from '../utils/axiosCustomize';

const getTicketByEventId = (eventId) => {
    return axios.get(`/event/getTicketByEventId?eventId=${eventId}`);
}

const addTicket = (data) => {
    const formData = new FormData();

    formData.append('eventId', data.eventId);
    formData.append('ticketName', data.ticketName);
    formData.append('ticketPrice', data.ticketPrice);
    formData.append('ticketAmount', data.ticketAmount);
    formData.append('ticketMin', data.ticketMin);
    formData.append('ticketMax', data.ticketMax);
    formData.append('ticketDesc', data.ticketDesc);
    formData.append('ticketImage', data.ticketImage);
    formData.append('eventTicketSaleStartTime', data.eventTicketSaleStartTime);
    formData.append('eventTicketSaleEndTime', data.eventTicketSaleEndTime);

    return axios.post('/event/add-ticket', formData);
};

const updateTicket = (data) => {
    const formData = new FormData();

    formData.append('ticketId', data.ticketId);
    formData.append('eventId', data.eventId);
    formData.append('ticketName', data.ticketName);
    formData.append('ticketPrice', data.ticketPrice);
    formData.append('ticketAmount', data.ticketAmount);
    formData.append('ticketMin', data.ticketMin);
    formData.append('ticketMax', data.ticketMax);
    formData.append('ticketDesc', data.ticketDesc);
    formData.append('ticketImage', data.ticketImage);
    formData.append('eventTicketSaleStartTime', data.eventTicketSaleStartTime);
    formData.append('eventTicketSaleEndTime', data.eventTicketSaleEndTime);

    return axios.put('/event/update-ticket', formData);
};

export { addTicket, getTicketByEventId, updateTicket };
