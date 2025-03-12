import axios from '../utils/axiosCustomize';

const fetchGroup = () => {
    return axios.get('/customer/group/read');
};

export { fetchGroup };
