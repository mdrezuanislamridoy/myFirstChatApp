import axios from "axios";

const url =
  import.meta.env.MODE === "production"
    ? "https://my-first-chat-app-lemon.vercel.app/api"
    : "http://localhost:5000/api";

const AxiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default AxiosInstance;
