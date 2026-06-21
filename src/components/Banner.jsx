"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import Link from "next/link";

// মেইন ব্যানার সেকশন
const Banner = () => {
    return (
        <section className="relative w-full py-20 overflow-hidden bg-[#2d2a45] mt-0">
            <div className="container mx-auto px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
                >
                    Get your tasks done by <span className="text-pink-500">skilled freelancers</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-6 text-lg text-white max-w-2xl mx-auto"
                >
                    SkillSwap connects you with top-tier talent for every project.
                    Post your task, hire the best, and get it done effortlessly.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                >
                    {/* গ্রেডিয়েন্ট বাটন */}
                    <Button as={Link} href="/post-task" className="px-8 font-semibold bg-gradient-to-r from-pink-500 to-violet-600 text-white" radius="full" size="lg">
                        Post a Task
                    </Button>
                    <Button as={Link} href="/tasks" variant="bordered" radius="full" size="lg" className="px-8 text-white border-white hover:bg-white/10">
                        Browse Tasks
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

// How It Works সেকশন
export const HowItWorks = () => {
    const steps = [
        { title: "Post a Task", desc: "Define your requirements and budget." },
        { title: "Get Proposals", desc: "Review bids from talented experts." },
        { title: "Hire and Pay", desc: "Select the best and pay securely." }
    ];

    return (
        <section className="py-20 bg-[#1e1b2e]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-6 bg-[#2d2a45] border border-white/10 rounded-2xl text-center"
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">{i + 1}</div>
                            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                            <p className="mt-2 text-white/80">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Popular Categories সেকশন
export const PopularCategories = () => {
    const categories = ["Design", "Writing", "Development", "Marketing", "Other"];

    return (
        <section className="py-20 bg-[#1e1b2e]">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-12">Popular Categories</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            href={`/category/${cat.toLowerCase()}`}
                            className="px-6 py-3 bg-[#2d2a45] hover:bg-gradient-to-r from-pink-500 to-violet-600 transition-all border border-white/10 rounded-full text-white"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;