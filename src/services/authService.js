import api from "./api";

export const register = async (userData) => {
  const response = await api.post("/Users/signup", userData);
  return response.data;
};