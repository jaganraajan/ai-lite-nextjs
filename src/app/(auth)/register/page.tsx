"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthForm } from "@/components/custom/auth-form";
import { SubmitButton } from "@/components/custom/submit-button";

import axios from 'axios';

export default function Page() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState('');

    const handleSubmit = async (formData: FormData) => {
      setEmail(formData.get("email") as string);
      try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const response = await axios.post('/api/createUser', { email, password });
        setMessage(response.data.message);
    } catch (error) {
        setMessage('An error occurred');
        console.log(error);
    }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Sign Up</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Create an account with your email and password
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Already have an account? "}
            <Link
              href="/login"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign in
            </Link>
            {" instead."}
          </p>
          {message && <p>{message}</p>}
        </AuthForm>
      </div>
    </div>
    );
}