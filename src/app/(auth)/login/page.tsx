"use client";

import { AuthForm } from "@/components/custom/auth-form";
import { SubmitButton } from "@/components/custom/submit-button";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Page() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState('');
        
    const handleSubmit = async (formData: FormData) => {
        setEmail(formData.get("email") as string);
        try {
            const password = formData.get("password") as string;
            console.log("next auth signin");
            const result = await signIn("credentials", {
              redirect: false, // Prevent automatic redirection
              email,
              password,
            });

            console.log(result);
        
            if (result?.error) {
              setMessage(result.error);
            } else {
              // Redirect to the dashboard or another page after successful login
              window.location.href = "/";
              setMessage('Success login, redirecting...')
            }
        } catch (error) {
            setMessage('An error occurred');
            console.log(error);
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Sign In</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Use your email and password to sign in
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={"test"}>
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign up
            </Link>
            {" for free."}
          </p>
        </AuthForm>
        {message && <p>{message}</p>}
      </div>
    </div>
    );
}