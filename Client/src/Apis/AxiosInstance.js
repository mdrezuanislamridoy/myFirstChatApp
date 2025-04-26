import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://my-first-chat-app-lemon.vercel.app/api",
  withCredentials: true,
});

export default AxiosInstance;
