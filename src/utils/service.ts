import axios from "axios";
// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // api的base_url
  timeout: 90000, // 请求超时时间
  withCredentials: true, // 是否跨域
});

// request拦截器，
service.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      timestamp: new Date().getTime(),
    };
    return config;
  },
  (error) => {
    // return Promise.reject(error);
    return error;
  },
);
// respone拦截器,这里主要拦截错误信息
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // return Promise.reject(error);
    return error;
  },
);
export default service;
