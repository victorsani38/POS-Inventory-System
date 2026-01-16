import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URI + "/api",
  withCredentials: true, // important for sending cookies
});

export default instance;