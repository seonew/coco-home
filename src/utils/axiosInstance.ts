import axios from 'axios';
import store from '../stores';

const URL = process.env.REACT_APP_ROOT_URI;

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use(
  (request) => {
    const token = store.getState().app.token;
    request.headers['x-auth-token'] = token;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.dir(error);
    if (error.response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('name');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('lastHomeId');

      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default instance;
