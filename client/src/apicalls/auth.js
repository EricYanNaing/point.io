import { axiosinstance } from "./axiosinstance";

export const registerUser = async (payload) => {
  try {
    const response = await axiosinstance.post("/register", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosinstance.post("/login", payload, {
      validateStatus: () => true,
    });
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
