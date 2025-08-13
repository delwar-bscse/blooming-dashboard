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
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";

// Schema
const contactUsFormSchema = z
  .object({
    verifyOtp: z.string(),
  });

// Type
type ContactUsFormValues = z.infer<typeof contactUsFormSchema>;

const defaultValues: Partial<ContactUsFormValues> = {
  verifyOtp: "",
};

const VerifyOtp = () => {
  const router = useRouter();

  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ContactUsFormValues) {
    // console.log("Submitted Data:", data);
    const res = await myFetch("/auth/forgot-password-otp-match", {
      method: "PATCH",
      body: {
        otp: data.verifyOtp,
      },
      headers: {
        token: localStorage.getItem("forgetPasswordToken") || "",
      },
    });

    // console.log("Response Verify OTP:", res);
    if (res.success) {
      toast.success(res.message || "OTP verified successfully!");
      localStorage.removeItem("forgetPasswordToken");
      localStorage.setItem("forgetOtpMatchToken", res?.data?.forgetOtpMatchToken);
      router.push("/reset-password");
    } else {
      toast.error(res.message || "Invalid OTP, please try again.");
    }
  }


  return (
    <div className="w-full max-w-[700px] mx-auto flex text-center justify-center py-20 px-2">
      <div className="bg-[#56515166] px-2 sm:px-4 md:px-8 py-6 md:py-8 w-full rounded-4xl">
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-white pb-12">Verify OTP</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Email */}
            <FormField
              control={form.control}
              name="verifyOtp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button variant="customWhite" type="submit" size="llg" className="w-full">
              Submit
            </Button>

          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOtp;
