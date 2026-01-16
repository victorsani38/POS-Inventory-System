import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URI + "/api";
axios.defaults.withCredentials = true;

export default axios;      