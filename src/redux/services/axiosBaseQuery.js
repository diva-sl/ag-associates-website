import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "https://agandassociates.org/api"
    : "http://localhost:5001/api";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const axiosBaseQuery =
  () =>
  async ({ url, method, body, params }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data: body,
        params,
      });
      return { data: result.data };
    } catch (err) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        },
      };
    }
  };

export default axiosBaseQuery();
