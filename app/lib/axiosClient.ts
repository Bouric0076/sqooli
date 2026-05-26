import axios from "axios";
import https from "https";


import Cookies from "js-cookie";
import { use } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { redirect } from "next/navigation";


// Detect if we're in development
const isDev = process.env.NODE_ENV === "development";


const axiosClient = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // Only ignore SSL errors in development if using self-signed certs
  ...(isDev && {
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  }),
});

// Add a request interceptor to include the access token from cookies
axiosClient.interceptors.request.use(async (config) => {
  const { getAccessToken } = await import("./getAccessToken");
  const token = await getAccessToken();

  console.log("Attaching token to request:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// 🚨 Handle 401 globally
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const deleteAccessToken = async () => {
      const { deleteAuthTokens } = await import("./getAccessToken");
      await deleteAuthTokens();
    };
    if (
      error.response &&
      error.response.status === 401
    ) {
      // Clear auth data
      Cookies.remove("access_token");
      // localStorage.clear();
      useAuthStore.getState().clearAuth();
      useAuthStore.getState().logout();
      // Redirect to login\
       await deleteAccessToken();

    //  redirect("/login");


    }

    return Promise.reject(error);
  }
);

export default axiosClient;
