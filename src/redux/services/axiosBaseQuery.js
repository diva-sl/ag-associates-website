import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "https://ag-associates-backend.onrender.com/api"
    : "http://localhost:5001/api";

const axiosInstance = axios.create({
  baseURL,
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 🔥 Auto logout
      localStorage.removeItem("authToken");

      window.location.href = "/auth"; // redirect to login
    }

    return Promise.reject(error);
  },
);

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
