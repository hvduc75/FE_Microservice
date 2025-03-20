import axios from '../utils/axiosCustomize';

const updateProfile = (name, phone, birthDay, avatar, gender) => {
    const formData = new FormData();

    formData.append('avatar', avatar);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('birthDay', birthDay);
    formData.append('gender', gender);

    return axios.put('/customer/update-profile', formData);
};

const fetchGroup = () => {
    return axios.get('/customer/group/read');
};

export { fetchGroup, updateProfile };
