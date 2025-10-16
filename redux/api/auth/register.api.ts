import { baseApi } from "@/redux/base-api";
import {
  IRegisterConfirmPayload,
  IRegisterResendOtpPayload,
  IRegisterSendOtpPayload,
  IRegisterVerifyOtpPayload,
} from "@/types";

const url = "/auth";

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Send OTP
    sendRegisterOtp: builder.mutation({
      query: (arg: { data: IRegisterSendOtpPayload }) => ({
        url: url + "/send-otp",
        method: "POST",
        data: arg.data,
      }),
    }),

    // 2. Resend OTP
    resendRegisterOtp: builder.mutation({
      query: (arg: { data: IRegisterResendOtpPayload }) => ({
        url: url + "/send-otp",
        method: "POST",
        data: arg.data,
      }),
    }),

    // 3. Verify OTP
    verifyRegisterOtp: builder.mutation({
      query: (arg: { data: IRegisterVerifyOtpPayload }) => ({
        url: url + "/verify-otp",
        method: "POST",
        data: arg.data,
      }),
    }),

    // 4. Confirm Registration (set password)
    confirmRegister: builder.mutation({
      query: (arg: {
        data: IRegisterConfirmPayload;
        headers: { "x-short-token": string };
      }) => {
        return {
          url: url + "/set-password",
          method: "POST",
          data: arg.data,
          headers: arg.headers,
        };
      },
    }),
  }),

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
});

export const {
  useSendRegisterOtpMutation,
  useResendRegisterOtpMutation,
  useVerifyRegisterOtpMutation,
  useConfirmRegisterMutation,
} = registerApi;
