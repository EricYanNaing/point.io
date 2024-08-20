import axios from "axios";

export const axiosinstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
