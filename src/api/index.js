import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
})

axiosSecure.interceptors.response.use(res => {
    return res;
},
    async (err) => {
        if (err.response && err.response.status == 401 || err.response.status == 403) {
            window.location.replace('/login');
        }
        return Promise.reject(err);
    }
)

export default axiosSecure;