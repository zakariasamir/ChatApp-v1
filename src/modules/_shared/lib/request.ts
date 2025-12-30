import axios from "axios";
// import getStoreState from "../store";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_ENDPOINT || "http://localhost:4000/api",
  withCredentials: true, // Required for httpOnly cookies
});

request.defaults.params = {};

request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // try {
    //   const state = getStoreState();
    //   if (state?.activeMembershipId && state?.activeMembershipMeta) {
    //     const keys = {
    //       COMPANY: `X-CMP`,
    //       ORGANIZATION: `X-ORG`,
    //     };
    //     const key = keys[state.activeMembershipMeta?.type];
    //     config.headers.common[key] = `${state?.activeMembershipId}`;
    //   }
    // } catch (error) {}

    // try {
    //   const token = window.localStorage.getItem(
    //     process.env.NEXT_PUBLIC_LOCALSTORAGE_KEY
    //   );
    //   config.headers.common["Authorization"] = `Bearer ${token}`;
    // } catch (e) {}

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  (response) => {
    // Return the response data (already parsed by axios)
    return response.data;
  },
  (error) => {
    // Preserve the error structure for proper error handling
    // This allows components to check error.response.status (e.g., for 401)
    return Promise.reject(error);
  }
);

export default request;
