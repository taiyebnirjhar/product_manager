/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { axiosInstance } from "@/lib/axios/axios-instance";
import { ILoginCredentials } from "@/types";

const auth_url = "/auth";

export const loginWithCredential = async (
  body: ILoginCredentials
): Promise<any> => {
  const res = await axiosInstance({
    url: auth_url + "/login",
    method: "POST",
    data: body,
  });

  // console.log(res);
  return res;
};
