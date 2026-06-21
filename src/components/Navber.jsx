"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        // Navbar ব্যাকগ্রাউন্ড এখন আপনার বডির সাথে সামঞ্জস্যপূর্ণ
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1e1b2e]/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Logo Section */}
                <Link href={'/'} className="flex items-center gap-1 group">
                    <div className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-violet-600 text-white font-black text-xl h-9 w-9 rounded-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                        S
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-white">
                        Skill<span className="text-pink-500">Swap</span>
                    </span>
                </Link>

                {/* Public Links */}
                <nav className="hidden md:flex items-center gap-6 text-white">
                    <Link href="/" className="hover:text-pink-400 transition-colors">Home</Link>
                    <Link href="/tasks" className="hover:text-pink-400 transition-colors">Browse Tasks</Link>
                    <Link href="/freelancers" className="hover:text-pink-400 transition-colors">Browse Freelancers</Link>
                </nav>

                {/* Auth Section */}
                <div className="flex items-center gap-4 text-white">
                    {!user ? (
                        <>
                            <Link href="/login" className="font-medium hover:text-pink-400">Login</Link>
                            <Link href="/register">
                                {/* বাটন এখন আপনার পছন্দের সেই গ্রেডিয়েন্টে */}
                                <Button className="bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium" radius="full">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar isBordered as="button" src={user?.image} className="border-pink-500" />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" className="bg-[#2d2a45] text-white">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-xs text-white/60">{user.email}</p>
                                </DropdownItem>
                                <DropdownItem key="dashboard" href={`/dashboard/${user.role}`} startContent={<MdDashboard />}>
                                    Dashboard
                                </DropdownItem>
                                <DropdownItem key="profile_page" href="/profile" startContent={<CgProfile />}>
                                    Profile
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger" startContent={<BiLogOut />} onClick={handleSignOut}>
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