import axios from "axios";
import queryClient from "./queryClient";
import { navigate } from "../lib/navigation";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const TokenRefreshClient = axios.create(options);

TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

API.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const { config } = error;
        const { status, data } = error.response;
        // trying to refresh the access token behind the scenes

        if (status === 401 && data?.errorCode === "InvalidAccessToken") {
            // refresh token
            try {
              await TokenRefreshClient.get("/auth/refresh");
              return TokenRefreshClient(config);
            // eslint-disable-next-line no-unused-vars
            } catch (errror) {
                // if refresh token fails, redirect to login
                queryClient.clear();
                navigate('/login', {
                    state: {  // to pass data to the login page for redirecting the user back to the page they were on
                      redirectUrl: window.location.pathname 
                    },
                });
            }
        }

        return Promise.reject({status, ...data});
    }
);

export default API;
