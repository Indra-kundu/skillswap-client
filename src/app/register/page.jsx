"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Description, Fieldset, Form, Input, Label, Surface, TextField, RadioGroup, Radio } from "@heroui/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { name, email, password, role, image } = Object.fromEntries(formData.entries());

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 6 characters long, contain at least one uppercase and one lowercase letter.");
            return;
        }

        try {
            await authClient.signUp.email({
                email,
                password,
                name,
                image: image || undefined,
                additionalData: { role: role } // এখানে রোল সেভ হচ্ছে
            });
            redirect('/');
        } catch (err) {
            setError("Signup failed. Please try again.");
        }
    };

    // ... (আপনার আগের onSubmit এবং password logic একই থাকবে)

    const handleGoogleSignUp = async () => {
        await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1e1b2e] p-6">
            <Surface className="w-full max-w-lg p-8 bg-[#2d2a45] border border-white/10 rounded-3xl shadow-2xl">
                <Form onSubmit={onSubmit}>
                    <Fieldset className="w-full space-y-5">
                        <div className="text-center">
                            <Fieldset.Legend className="text-3xl font-bold text-white">Join SkillSwap</Fieldset.Legend>
                            <Description className="text-white/60 mt-1">Create your professional account</Description>
                        </div>

                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                        <TextField isRequired name="name"><Label className="text-white">Name</Label><Input placeholder="John Doe" /></TextField>
                        <TextField name="image" type="url"><Label className="text-white">Image URL</Label><Input placeholder="https://..." /></TextField>
                        <TextField isRequired name="email" type="email"><Label className="text-white">Email</Label><Input placeholder="john@example.com" /></TextField>
                        <TextField isRequired name="password" type="password"><Label className="text-white">Password</Label><Input placeholder="••••••••" /></TextField>

                        {/* Professional Role Selection */}
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <Label className="text-white font-semibold mb-3 block">SignUp As</Label>
                            <RadioGroup name="role" isRequired defaultValue="client" className="grid grid-cols-2 gap-4">
                                <Radio value="client" className="p-3 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">Client</Radio>
                                <Radio value="freelancer" className="p-3 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">Freelancer</Radio>
                            </RadioGroup>
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-violet-600 text-white text-lg h-12">
                            Create Account
                        </Button>
                    </Fieldset>
                </Form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="bg-[#2d2a45] px-2 text-white/40">OR</span></div>
                </div>

                {/* Google Sign Up Button at the bottom */}
                <Button
                    onClick={handleGoogleSignUp}
                    className="w-full bg-white text-black font-semibold flex items-center justify-center gap-3 h-12 hover:bg-gray-100 transition-all"
                >
                    <FcGoogle size={24} /> Continue with Google
                </Button>
            </Surface>
        </div>
    );
}