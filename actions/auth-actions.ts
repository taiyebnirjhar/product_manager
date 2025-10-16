"use server";

import { axiosInstance } from "@/lib/axios/axios-instance";
import { ILoginCredentials } from "@/types";

export const loginWithCredential = async (
  body: ILoginCredentials
): Promise<{ token: string }> => {
  const res = await axiosInstance.post("/auth", body);

  if (!res?.data?.token) throw new Error("Login failed");

  return res.data; // { token: "..." }
};
