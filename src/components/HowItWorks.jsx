"use client";

import { motion } from "framer-motion";

const HowItWorks = () => {
    const steps = [
        { title: "Post a Task", desc: "Define your requirements and budget." },
        { title: "Get Proposals", desc: "Review bids from talented experts." },
        { title: "Hire and Pay", desc: "Select the best and pay securely." }
    ];

    return (
        // বডির কালার অনুযায়ী ব্যাকগ্রাউন্ড এবং সেকশন কার্ডের জন্য নতুন কালার
        <section className="py-20 bg-[#1e1b2e]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            // কার্ডের ব্যাকগ্রাউন্ড হিসেবে #2d2a45 ব্যবহার করা হয়েছে
                            className="p-6 bg-[#2d2a45] border border-white/10 rounded-2xl text-center hover:border-pink-500 transition-all"
                        >
                            {/* গ্রেডিয়েন্ট আইকন */}
                            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                                {i + 1}
                            </div>
                            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                            <p className="mt-2 text-white/70">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;