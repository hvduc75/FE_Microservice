import axios from '../utils/axiosCustomize';

export const getNotifications = async () => {
    try {
        const res = await axios.get('/notification/get-notifications');
        console.log('📥 Fetched notifications:', res.data);
        return res.data; // trả về dữ liệu để sử dụng ở nơi khác
    } catch (err) {
        console.error('Failed to fetch notifications', err);
        throw err; // ném lỗi để xử lý ở nơi gọi hàm này
    }
};
