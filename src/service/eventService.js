import axios from '../utils/axiosCustomize';

const getEvent = (eventId) => {
    return axios.get(`/event/getEventById?eventId=${eventId}`);
};

const getEventByCondition = (condition, page, limit) => {
    return axios.get(`/event/getEventByCondition?condition=${condition}&page=${page}&limit=${limit}`);
};

const addEvent = (data) => {
    const formData = new FormData();

    formData.append('eventName', data.eventName);
    formData.append('locationType', data.locationType);
    formData.append('locationName', data.locationName);
    formData.append('address', data.address);
    formData.append('eventType', data.eventType);
    formData.append('eventDescription', data.eventDescription);
    formData.append('organizerName', data.organizerName);
    formData.append('organizerDesc', data.organizerDesc);
    formData.append('eventLogo', data.eventLogo);
    formData.append('backgroundEvent', data.backgroundEvent);
    formData.append('organizerLogo', data.organizerLogo);

    return axios.post('/event/add-event', formData);
};

const editEvent = (data) => {
    const formData = new FormData();

    formData.append('eventId', data.eventId);
    formData.append('eventName', data.eventName);
    formData.append('locationType', data.locationType);
    formData.append('locationName', data.locationName);
    formData.append('address', data.address);
    formData.append('eventType', data.eventType);
    formData.append('eventDescription', data.eventDescription);
    formData.append('organizerName', data.organizerName);
    formData.append('organizerDesc', data.organizerDesc);
    console.log(data.eventLogo);
    formData.append('eventLogo', data.eventLogo);
    console.log(data.backgroundEvent);
    formData.append('backgroundEvent', data.backgroundEvent);
    console.log('organizerLogo', data.organizerLogo);
    formData.append('organizerLogo', data.organizerLogo);

    return axios.put('/event/edit-event', formData);
};

const updateEventDate = (eventId, startDate, endDate) => {
    const formData = new FormData();

    formData.append('eventId', eventId);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);

    return axios.put('/event/updateEventDate', formData);
};

export { addEvent, getEvent, updateEventDate, getEventByCondition, editEvent };
