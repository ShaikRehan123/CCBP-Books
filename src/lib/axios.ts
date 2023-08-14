import axios from "axios";

const BACKEND_URL = "https://api.itbook.store/1.0/";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export { BACKEND_URL, axiosInstance };
