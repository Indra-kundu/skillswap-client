"use client";

import { authClient } from "@/lib/auth-client";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
    const router = useRouter();

    const { data: session, isLoading } = authClient.useSession();
    const user = session?.user ?? null;

    const pathname = usePathname()
    if (pathname.includes('dashboard')) {
        return null;
    }

    const handleSignOut = async () => {
        try {
            await authClient.signOut();

            // IMPORTANT: clear UI + force refresh session
            router.push("/");
            router.refresh();
        } catch (err) {
            console.error("SIGNOUT ERROR:", err);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1e1b2e]/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-1 group">
                    <div className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-violet-600 text-white font-black text-xl h-9 w-9 rounded-xl">
                        S
                    </div>
                    <span className="text-2xl font-extrabold text-white">
                        Skill<span className="text-pink-500">Swap</span>
                    </span>
                </Link>

                {/* Links */}
                <nav className="hidden md:flex items-center gap-6 text-white">
                    <Link href="/">Home</Link>
                    <Link href="/dashboard/client/myTask">Browse Tasks</Link>
                    <Link href="/freelancers">Browse Freelancers</Link>
                </nav>

                {/* Auth */}
                <div className="flex items-center gap-4 text-white">
                    {/* loading state fix */}
                    {isLoading ? (
                        <div className="text-white/50 text-sm">Loading...</div>
                    ) : !user ? (
                        <>
                            <Link href="/login">Login</Link>

                            <Link href="/register">
                                <Button
                                    className="bg-gradient-to-r from-pink-500 to-violet-600 text-white"
                                    radius="full"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    ) : (

                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    src={user.image || ""}
                                    className="transition-transform border-pink-500 cursor-pointer"
                                // className="border-2 "
                                />
                            </DropdownTrigger>

                            <DropdownMenu className="bg-[#2d2a45] text-white">

                                <DropdownItem key="info" className="h-14">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-xs text-white/60">{user.email}</p>
                                </DropdownItem>

                                <DropdownItem
                                    key="dashboard"
                                    href={`/dashboard/${user?.role}`}
                                    startContent={<MdDashboard />}
                                >
                                    Dashboard
                                </DropdownItem>

                                <DropdownItem
                                    key="profile"
                                    href="/profile"
                                    startContent={<CgProfile />}
                                >
                                    Profile
                                </DropdownItem>

                                <DropdownItem
                                    key="logout"
                                    color="danger"
                                    startContent={<BiLogOut />}
                                    onClick={handleSignOut}
                                >
                                    Logout
                                </DropdownItem>

                            </DropdownMenu>
                        </Dropdown>


                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;