import axios from "axios";

// import { useAuthStore } from '../../../features/authForm/AuthForm/auth.store';

const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;
export const axiosInstance = axios.create({
  baseURL: apiUrl,
});

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const { jwtToken } = useAuthStore.getState();
//
//     if (jwtToken) {
//       config.headers.Authorization = `Bearer ${jwtToken}`;
//       config.headers.Accept = config.headers['Accept'] ?? 'application/json';
//     }
//
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );
//
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Return the response if it's successful
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//
//     // Check if the error is due to an unauthorized request
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Prevent infinite loop
//
//       // Повторять запрос при 502, но с ограничением по числу попыток
//       const maxRetries = 5;
//       const retryDelay = 1000; // мс (1 секунда)
//
//       if (error.response?.status === 502) {
//         originalRequest._retryCount = originalRequest._retryCount || 0;
//
//         if (originalRequest._retryCount < maxRetries) {
//           originalRequest._retryCount++;
//
//           // Подождать перед повтором
//           await new Promise((resolve) => setTimeout(resolve, retryDelay));
//
//           // Повторный запрос
//           return axiosInstance(originalRequest);
//         } else {
//           console.warn('Max retry attempts reached for 502');
//           return Promise.reject(error);
//         }
//       }
//
//       try {
//         // Attempt to refresh the access token
//         const response = await axiosInstance.post(`${AUTH_ENDPOINTS.refreshToken}`, {
//           token: useAuthStore.getState().refreshToken
//         });
//
//         const newAccessToken = response.data.jwtToken;
//         useAuthStore.getState().setNewToken(newAccessToken); // Update your state with the new access token
//
//         // Update the original request's Authorization header
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//
//         // Retry the original request with the new token
//         return axios(originalRequest);
//       } catch (tokenRefreshError) {
//         // Handle token refresh failure (e.g., logout the user)
//         console.error('Token refresh failed', tokenRefreshError);
//         return Promise.reject(tokenRefreshError);
//       }
//     }
//
//     // Handle other errors
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
