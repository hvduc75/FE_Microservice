import axios from '../utils/axiosCustomize';

export const getNotifications = async () => {
    try {
        const res = await axios.get('/notification/get-notifications');
        return res; 
    } catch (err) {
        console.error('Failed to fetch notifications', err);
        throw err;
    }
};
