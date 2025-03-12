import axios from '../utils/axiosCustomize';

const fetchAllRole = () => {
    return axios.get('/customer/role/read');
};

const createAddRole = (data) => {
    return axios.post('/customer/role/create', data);
};

const updateRole = (id, url, description) => {
    return axios.put('/customer/role/update', { id, url, description });
};

const deleteRole = (roleId) => {
    return axios.delete(`/customer/role/delete?roleId=${roleId}`);
};

const fetchRolesByGroup = (groupId) => {
    return axios.get(`/customer/role/by-group${groupId}`);
};

const assignRoleToGroup = (data) => {
    return axios.post('/customer/role/assign-to-group', { data });
};

export { createAddRole, deleteRole, fetchAllRole, fetchRolesByGroup, assignRoleToGroup, updateRole };
