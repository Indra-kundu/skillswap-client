"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Description, Fieldset, Form, Input, Label, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData.entries());

        try {
            const { data } = await authClient.signIn.email({
                email,
                password,
            });

            // Role-based redirect
            if (data?.user?.role === "client") {
                router.push("/");
            } else {
                router.push(`/dashboard/${data?.user?.role}`);
            }
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/", // Google OAuth ইউজার অটোমেটিক ক্লায়েন্ট হিসেবে সেভ হবে
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1e1b2e] p-6">
            <Surface className="w-full max-w-md p-8 bg-[#2d2a45] border border-white/10 rounded-3xl">
                <Form onSubmit={onSubmit}>
                    <Fieldset className="w-full space-y-4">
                        <Fieldset.Legend className="text-2xl font-bold text-white">Sign In</Fieldset.Legend>
                        <Description className="text-white/60">Welcome back to SkillSwap</Description>

                        {error && <p className="text-red-400 text-sm">{error}</p>}

                        <TextField isRequired name="email" type="email">
                            <Label className="text-white">Email</Label>
                            <Input placeholder="john@example.com" />
                        </TextField>

                        <TextField isRequired name="password" type="password">
                            <Label className="text-white">Password</Label>
                            <Input placeholder="••••••••" />
                        </TextField>

                        <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium">
                            Sign In
                        </Button>
                    </Fieldset>
                </Form>

                <div className="my-6 text-center text-white/50 text-sm">OR</div>

                <Button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white text-black font-medium flex items-center gap-2"
                >
                    <FcGoogle size={20} /> Continue with Google
                </Button>
            </Surface>
        </div>
    );
}