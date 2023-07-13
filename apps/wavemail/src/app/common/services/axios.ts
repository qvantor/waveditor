import axios, { CreateAxiosDefaults } from 'axios';
import { authStore, getToken } from '../../auth';

export const createAxiosInstance = (defaults?: CreateAxiosDefaults) => {
  const axiosInstance = axios.create(defaults);
  axiosInstance.interceptors.request.use(async (config) => {
    const token = getToken(authStore.getValue());
    if (token) config.headers.set('authorization', `Bearer ${token}`);
    return config;
  });
  return axiosInstance;
};
