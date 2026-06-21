"use client";

import Link from "next/link";

const PopularCategories = () => {
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
                            // ব্যাকগ্রাউন্ড হিসেবে #2d2a45 এবং হোভারে আপনার সেই গ্রেডিয়েন্ট থিম
                            className="px-8 py-4 bg-[#2d2a45] hover:bg-gradient-to-r from-pink-500 to-violet-600 transition-all border border-white/10 rounded-xl text-white font-medium"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;