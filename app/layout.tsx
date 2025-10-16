import { Toaster, TooltipProvider } from "@/components/ui";
import { outfit } from "@/fonts/fonts";
import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/auth-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Session as NextAuthSession } from "next-auth";
import { Toaster as SonnerToaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Product Manager",
    template: "%s | Product Manager",
  },
  description: "Product Manager",
  keywords: ["Product Manager"],
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: NextAuthSession;
}>) {
  return (
    <html
      lang="en"
      className={cn("", outfit.variable)}
      suppressHydrationWarning
    >
      <body className={cn("min-h-screen bg-background font-sans antialiased ")}>
        <AuthProvider session={session}>
          <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <TooltipProvider>{children}</TooltipProvider>
            </ThemeProvider>
          </ReduxProvider>
        </AuthProvider>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
