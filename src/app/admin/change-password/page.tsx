"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";

// Schema
const contactUsFormSchema = z
  .object({
    oldPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Type
type ContactUsFormValues = z.infer<typeof contactUsFormSchema>;

const defaultValues: Partial<ContactUsFormValues> = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function ChangePassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ContactUsFormValues) {
    toast.loading("Changing Password...", { id: "changePassword" });
    const payload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    }
    const res = await myFetch(`/auth/change-password`, {
      method: "PATCH",
      body: payload,
    })
    
    if(res?.success) {
      toast.success("Password changed successfully!", { id: "changePassword" });
      router.push("/login");
    }else {
      toast.error(res?.message || "Password change failed!", { id: "changePassword" });
    }
  }

  return (
    <div className="w-full max-w-[700px] mx-auto flex text-center justify-center mt-40">
      <div className="bg-white shadow px-2 sm:px-4 md:px-8 py-6 md:py-8 w-full rounded-4xl">
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-600 pb-12">Change Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Old Password */}
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Old Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        variant="borderblack"
                        placeholder="Enter password"
                        className="pr-10"
                        {...field}
                      />
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-100 hover:text-gray-200 z-10"
                        onClick={() => setShowPassword(prev => !prev)}
                      >
                        {showPassword ? <EyeOff size={20} className="text-gray-400"/> : <Eye size={20} className="text-gray-400"/>}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        variant="borderblack"
                        placeholder="Enter password"
                        className="pr-10"
                        {...field}
                      />
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-100 hover:text-gray-200 z-10"
                        onClick={() => setShowPassword(prev => !prev)}
                      >
                        {showPassword ? <EyeOff size={20} className="text-gray-400"/> : <Eye size={20} className="text-gray-400"/>}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 text-lg">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        variant="borderblack"
                        placeholder="Enter confirm password"
                        className="pr-10"
                        {...field}
                      />
                      <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-100 hover:text-gray-200 z-10"
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                      >
                        {showConfirmPassword ? <EyeOff size={20} className="text-gray-400"/> : <Eye size={20} className="text-gray-400"/>}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button variant="customYellow" type="submit" size="llg" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
