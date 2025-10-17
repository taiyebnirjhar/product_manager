/* eslint-disable @typescript-eslint/no-explicit-any */
import { envConfig } from "@/config/env-config";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types/common";
import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: envConfig.backendUrl,
});

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 100000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    const session: any = await getSession();

    // console.log(session);

    if (session) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  function (error) {
    //  console.log(error);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptors
axiosInstance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  function (response) {
    // console.log(response);

    const responseObject: ResponseSuccessType = {
      data: response?.data || undefined,
      meta: response?.data?.meta || undefined,
      success: response?.data?.success || undefined,
      message: response?.data?.message || undefined,
    };
    return responseObject;
  },
  async function (error) {
    //  console.log(error);
    const responseObject: IGenericErrorResponse = {
      error: {
        message:
          error?.response?.data?.message ||
          error?.response?.data?.error?.message ||
          "Something went wrong",
      },
      success: error.response?.data?.success || false,
    };
    return responseObject;
  }
);

export { axiosInstance };
