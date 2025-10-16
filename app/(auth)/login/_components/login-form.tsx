/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "@/service/auth/sign-in";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginFormSchema, loginFormValues } from "../schemas/login-form-schema";
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<loginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: loginFormValues) => {
    setIsLoading(true);
    const payload = { email: data.email };
    try {
      const result = await signIn(payload);

      // console.log(result);

      if (result?.error) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        toast.success("Login successful");
        window.location.replace("/");
      } else {
        toast.error("Login failed");
      }
    } catch (error: any) {
      // console.error("Login Error:", error);
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-base font-medium ">Email</FormLabel>
              <FormControl>
                <div className="relative mt-2">
                  <Input
                    type="tel"
                    placeholder="e.g. taiyebnirjhor@gmail.com"
                    disabled={isLoading}
                    className="w-full px-4 py-3 sm:py-4 text-base sm:text-lg border border-border rounded-lg focus:outline-none focus:border-transparent focus:shadow transition-all duration-200"
                    {...field}
                  />
                </div>
              </FormControl>
              {fieldState.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button className="w-full mt-2" type="submit">
          {isLoading ? "Wait..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
