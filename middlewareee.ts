/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { envConfig } from "./config/env-config";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token: any = await getToken({
    req: request,
    secret: envConfig.jwt.secret,
  });

  // console.log(token);
  const isAuthenticated = !!token?.user && !token?.error;

  if (!isAuthenticated) {
    const response = NextResponse.redirect(new URL("/login", request.nextUrl));
    response.cookies.delete("next-auth.session-token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Protect everything except:
      - /login
      - /api/auth/** (NextAuth routes)
      - _next static files
      - favicon.ico
    */
    "/((?!login|register|set-password|verify-otp|forgot-password|api/auth|_next|favicon.ico).*)",
  ],
};
