import axios from "axios";

const http = axios.create({
    baseURL: 'https://fruitproducts.org/api/v1'
});

http.interceptors.response.use(
    (res) => res.data,
    (err) => {
        const { status, data } = err?.response || {};;

        console.error('API Error:', data || err.message);
 
        return Promise.reject({
            message: data?.message || 'Unexpected error',
            status: status
        });
    }
);

export const getUserLogin = (user) => http.post('/user', user);