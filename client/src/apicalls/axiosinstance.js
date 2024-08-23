import axios from "axios";

const getFreshToken = () => {
  const refreshToken = localStorage.getItem("token");
  return refreshToken;
};

export const axiosinstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

axiosinstance.interceptors.request.use(
  (config) => {
    const token = getFreshToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
