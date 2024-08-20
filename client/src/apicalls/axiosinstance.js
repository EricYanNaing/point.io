import axios from "axios";

const getFreshToken = () => {
  return localStorage.getItem("token");
};

export const axiosinstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    Authorization: `Bearer ${getFreshToken()}`,
  },
});
