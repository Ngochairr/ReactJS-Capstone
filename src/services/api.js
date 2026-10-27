
import axios from "axios";

const api = axios.create({
  baseURL: "https://shop.cyberlearn.vn/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;