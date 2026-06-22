"use client";

import { authClient } from "@/lib/auth-client";
import {
    Button,
    Description,
    Fieldset,
    Form,
    Input,
    Label,
    Radio,
    RadioGroup,
    Surface,
    TextField,
    Select,
    ListBox
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            await authClient.signUp.email({
                email: String(data.email),
                password: String(data.password),
                name: String(data.name),
                image: data.image ? String(data.image) : undefined,
                role: String(data.role),
                plan: "free",
            });

            router.push("/");
        } catch (err) {
            console.error(err);
            setError("Signup failed");
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
            <Surface className="w-full max-w-lg p-8 bg-[#2d2a45]">

                <Form onSubmit={onSubmit}>
                    <Fieldset className="space-y-4">

                        <Fieldset.Legend className="text-3xl text-white font-bold">
                            Create Account
                        </Fieldset.Legend>

                        <Description className="text-white/60">
                            Join SkillSwap
                        </Description>

                        {error && <p className="text-red-400">{error}</p>}

                        <TextField name="name" isRequired>
                            <Label className="text-white">Name</Label>
                            <Input />
                        </TextField>

                        <TextField name="email" type="email" isRequired>
                            <Label className="text-white">Email</Label>
                            <Input />
                        </TextField>

                        <TextField name="password" type="password" isRequired>
                            <Label className="text-white">Password</Label>
                            <Input />
                        </TextField>

                        <TextField name="image">
                            <Label className="text-white">Image</Label>
                            <Input />
                        </TextField>


                        <Select isRequired name="role" placeholder="Select one">
                            <Label className="text-white">Signup As</Label>
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="client" textValue="client">
                                        Client
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="freelancer" textValue="freelancer">
                                        Freelancer
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>


                        <Button type="submit">
                            Create Account
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
        </div >
    );
}