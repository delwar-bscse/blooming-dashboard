"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner"
import { setCookie } from "cookies-next/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { myFetch } from "@/utils/myFetch";
import { useRouter } from "next/navigation";

// Schema
const contactUsFormSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    })
  });

// Type
type ContactUsFormValues = z.infer<typeof contactUsFormSchema>;

const defaultValues: Partial<ContactUsFormValues> = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ContactUsFormValues) {
    // console.log("Submitted Data:", data);
    toast.loading("Logging in...", {
      id: "login",
    });

    const payload = {
      email: data.email,
      password: data.password,
    };
    // console.log(payload);

    try {
      const res = await myFetch("/auth/login", {
        method: "POST",
        body: payload,
      });
      console.log("response", res)
      
      if (res?.success) {
        // console.log("Login successful:", res);
        setCookie("bloom_accessToken", res?.data?.accessToken);
        toast.success("Login Success", { id: "login" });

        if(res?.data?.user?.role === "admin") {
          router.push("/admin");
        } 

        if(res?.data?.user?.role === "creator") {
          router.push("/creator/all-project");
        }

      } else {
        toast.error(res?.message || "Login failed", { id: "login" });
      }
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
    }
  }


  return (
    <div className="w-full max-w-[700px] mx-auto flex text-center justify-center py-20 px-2">
      <div className="bg-[#56515166] px-2 sm:px-4 md:px-8 py-6 md:py-8 w-full rounded-4xl">
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-white pb-12">Log In</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-lg">Email</FormLabel>
                  <FormControl>
                    <Input variant="borderwhite" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-lg">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        variant="borderwhite"
                        placeholder="Enter password"
                        className="pr-10"
                        {...field}
                      />
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-100 hover:text-gray-200 z-10"
                        onClick={() => setShowPassword(prev => !prev)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Submit Button */}
            <Button variant="customWhite" type="submit" size="llg" className="w-full">
              Sign In
            </Button>

            <div className="relative -top-2 flex justify-between items-center">
              <Link href="/forgot-password" className="text-gray-100 hover:text-gray-200 font-semibold">
                Forgot Password
              </Link>
              <Link href="/brand-signup" className="text-gray-100 hover:text-gray-200 font-semibold">
                Create An Account
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
