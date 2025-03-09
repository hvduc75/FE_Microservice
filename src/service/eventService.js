import axios from '../utils/axiosCustomize';

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

const getEvent = (eventId) => {
    return axios.get(`/event/getEventById?eventId=${eventId}`);
}

export { addEvent, getEvent };
