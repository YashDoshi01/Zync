
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || "https://zync-production.up.railway.app/api", // fallback for dev
 });

export default api;
