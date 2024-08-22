import axios from "axios";

const getFreshToken = () => {
  const refreshToken = localStorage.getItem("token");
  console.log(refreshToken);
  return refreshToken;
};

export const axiosinstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    Authorization: `Bearer ${getFreshToken()}`,
  },
});
