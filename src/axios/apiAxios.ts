import axios from "axios";

const apiAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

apiAxios.defaults.withCredentials = true;

export { apiAxios };
