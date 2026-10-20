import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// Attach access token to each request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Refresh access token when it expires
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Refresh only when the access token expires.
    if (
      error.response?.status !== 401 ||
      error.response?.data?.message !== "Access token expired" ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      // Call the refresh token API using an HttpOnly cookie.
      const response = await axios.post(
        `${baseURL}/auth/refresh-token`,
        {},
        { withCredentials: true },
      );

      const newAccessToken = response.data?.data?.accessToken;

      if (!newAccessToken) {
        throw new Error("Access token is missing.");
      }

      // Save newAccessToken
      localStorage.setItem("accessToken", newAccessToken);

      // Attach the new access token to the original request.
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Call the original request again with the new access token.
      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("accessToken");
      return Promise.reject(refreshError);
    }
  },
);

export default api;
