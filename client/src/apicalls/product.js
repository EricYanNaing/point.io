import { axiosinstance } from "./axiosinstance";

export const sellProduct = async (payload) => {
  try {
    const response = await axiosinstance.post("/create-product", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
