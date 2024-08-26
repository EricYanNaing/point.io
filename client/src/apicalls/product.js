import { axiosinstance } from "./axiosinstance";

export const sellProduct = async (payload) => {
  try {
    const response = await axiosinstance.post("/create-product", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axiosinstance.get("/products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getOldProduct = async (id) => {
  try {
    const response = await axiosinstance.get(`/products/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateProductValues = async (payload) => {
  try {
    const response = await axiosinstance.post(`/update-product`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosinstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const uploadImage = async (formData) => {
  try {
    console.log(formData.get("product_images"));
    const response = await axiosinstance.post(`/upload`, formData, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
