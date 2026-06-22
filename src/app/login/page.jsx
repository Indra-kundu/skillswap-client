"use client";

import { authClient } from "@/lib/auth-client";
import {
    Button,
    Description,
    Fieldset,
    Form,
    Input,
    Label,
    Surface,
    TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        try {
            const res = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            const role = res?.data?.user?.role;

            if (role === "admin") router.push("/dashboard/admin");
            else if (role === "client") router.push("/");
            else router.push("/");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            console.error(err);
            setError("Google login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1e1b2e]">
            <Surface className="w-full max-w-md p-8 bg-[#2d2a45]">

                <Form onSubmit={onSubmit}>
                    <Fieldset className="space-y-4">

                        <Fieldset.Legend className="text-2xl text-white font-bold">
                            Sign In
                        </Fieldset.Legend>

                        <Description className="text-white/60">
                            Welcome back
                        </Description>

                        {error && <p className="text-red-400">{error}</p>}

                        <TextField name="email" type="email" isRequired>
                            <Label className="text-white">Email</Label>
                            <Input />
                        </TextField>

                        <TextField name="password" type="password" isRequired>
                            <Label className="text-white">Password</Label>
                            <Input />
                        </TextField>

                        <Button type="submit" disabled={loading}>
                            {loading ? "Loading..." : "Sign In"}
                        </Button>

                    </Fieldset>
                </Form>

                <Button
                    onClick={handleGoogle}
                    className="mt-6 w-full bg-white text-black"
                >
                    <FcGoogle /> Continue with Google
                </Button>

            </Surface>
        </div>
    );
}