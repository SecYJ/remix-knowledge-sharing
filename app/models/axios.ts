import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://remix-knowledge-sharing-backend.onrender.com",
});
