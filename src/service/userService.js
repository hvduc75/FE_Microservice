import axios from '../utils/axiosCustomize';

const getUserWithPaginate = (page, limit) => {
    return axios.get(`/customer/get-All-User?page=${page}&limit=${limit}`);
};

const fetchGroup = () => {
    return axios.get('/customer/group/read');
};

const postCreateNewUser = (email, password, username, phone, birthday, groupId, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('phone', phone);
    data.append('birthday', birthday);
    data.append('image', image);
    data.append('groupId', groupId);
    return axios.post('/customer/create-user', data);
};

const putUpdateUser = (id, username, birthDay, groupId, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('birthDay', birthDay);
    data.append('image', image);
    data.append('groupId', groupId);
    return axios.put('/customer/update-user', data);
};

const updateProfile = (name, phone, birthDay, avatar, gender) => {
    const formData = new FormData();

    formData.append('avatar', avatar);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('birthDay', birthDay);
    formData.append('gender', gender);

    return axios.put('/customer/update-profile', formData);
};

const updateReceiverInfo = (receiverName, receiverPhone, receiverEmail, address) => {
    const formData = new FormData();

    formData.append('receiverName', receiverName);
    formData.append('receiverPhone', receiverPhone);
    formData.append('receiverEmail', receiverEmail);
    formData.append('address', address);

    return axios.put('/customer/update-receiverInfo', formData);
};

const deleteUser = (id) => {
    return axios.delete(`/customer/delete-user?userId=${id}`)
};

export { fetchGroup, updateProfile, updateReceiverInfo, getUserWithPaginate, postCreateNewUser, putUpdateUser, deleteUser };
