"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// const formSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8),
// });

const AuthForm = ({ type }: { type: string }) => {
  const [user, setuser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="blue sky" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            BlueBank
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link Your Account to get started"
                : "Please Enter Your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4 ">
                    <CustomInput
                      name="firstName"
                      control={form.control}
                      label="First Name"
                      placeholder="Enter Your First Name"
                    />
                    <CustomInput
                      name="lastName"
                      control={form.control}
                      label="Last Name"
                      placeholder="Enter Your Last Name"
                    />
                  </div>
                  <CustomInput
                    name="address1"
                    control={form.control}
                    label="Address"
                    placeholder="Enter Your Address"
                  />
                  <div className="flex gap-4 ">
                    <CustomInput
                      name="postalCode"
                      control={form.control}
                      label="Postal Code"
                      placeholder="Example: 900211"
                    />
                    <CustomInput
                      name="dateOfBirth"
                      control={form.control}
                      label="Date Of Birth"
                      placeholder="Example: YYYY-MM-DD"
                    />
                  </div>
                  <div className="flex gap-4 ">
                    <CustomInput
                      name="state"
                      control={form.control}
                      label="State"
                      placeholder="Example: Abuja"
                    />

                    <CustomInput
                      name="ssn"
                      control={form.control}
                      label="SSN"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}

              <CustomInput
                name="email"
                control={form.control}
                label="Email"
                placeholder="Enter Your Email"
              />
              <CustomInput
                name="password"
                control={form.control}
                label="Password"
                placeholder="Enter Your Password"
              />
              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign-In"
                  ) : (
                    "Sign-Up"
                  )}
                </Button>
              </div>
            </form>
            <footer className="flex justify-center gap-1">
              <p className="text-14 font-normal text-gray-600">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="form-link"
              >
                {type === "sign-in" ? "Sign up" : "Sign In"}
              </Link>
            </footer>
          </Form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
