import axios from 'axios';

const local = 'localhost:8080';
const dev = '';

const apiInstance = axios.create({
  // baseURL: `${window.location.protocol}//${window.location.host}`,
  baseURL: `http://${local}`,
  withCredentials: true,
  // timeout: 8000
  // headers: {
  //
  // }
});

// request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log('요청 인터셉터 에러');
    console.log(error);
    return Promise.reject(error);
  }
);

// response interceptor
apiInstance.interceptors.response.use(
  (response) => {
    const body = response.data;
    console.log('응답 데이터');
    console.log(body);
    return response;
  },
  (error) => {
    // access token, refresh token 갱신
    console.log('응답 인터셉터 에러');
    console.log(error);
    // return Promise.reject(error);
  }
);

export default apiInstance;
