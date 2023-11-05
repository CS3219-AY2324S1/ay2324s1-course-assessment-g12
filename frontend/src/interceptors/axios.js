import axios from "axios";

axios.interceptors.request.use(response => response, error => {
    if (error.response.status === 401) {
        const response = axios.post("http://localhost:3001/token", localStorage.getItem("username"));

        if (response.status === 200) {
            return axios(error.config);
        }
    }

    return error;
});