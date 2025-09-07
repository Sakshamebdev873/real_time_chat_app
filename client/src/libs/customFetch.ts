import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:5100/api/v1",
});
customFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return axios(originalRequest);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await customFetch.post("/refresh", {
          refreshToken: refreshToken,
        });
        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return customFetch(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        console.error("Session expired. Please log in again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
export default customFetch;
