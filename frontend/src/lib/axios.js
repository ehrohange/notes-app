import axios from "axios";

// Do this in production since there is no localhost
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

const api = axios.create(
    {
        baseURL : BASE_URL,
    }
);

export default api;