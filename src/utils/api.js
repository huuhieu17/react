import axios from "axios";

const apiInstance = axios.create({
    baseURL: 'https://training.bks.center/'
})

const token = localStorage.getItem('token');
export const apiLoggedInInstance = axios.create({
    baseURL: 'https://training.bks.center/',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

apiLoggedInInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    console.log(error)
    const {response} = error;
    if(!response || response.status === 403){
        window.location.href = "/login"
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
 
export default apiInstance;