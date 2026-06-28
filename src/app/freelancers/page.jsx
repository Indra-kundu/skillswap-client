"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BrowseFreelancersPage() {
    const [freelancers, setFreelancers] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/freelancers`)
            .then(res => res.json())
            .then(data => setFreelancers(data))
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold text-white mb-2">Our Expert Freelancers</h1>
                <p className="text-gray-400">Discover and hire top-rated professionals for your upcoming projects.</p>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {freelancers.map((f) => (
                    <div
                        key={f._id}
                        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                        {/* Profile Image */}
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            <Image
                                src={f.image || "/default-avatar.png"}
                                alt={f.name}
                                fill
                                sizes="96px"
                                className="rounded-full object-cover border-4 border-gray-50 shadow-inner"
                            />
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{f.name}</h3>
                            <p className="text-blue-600 font-semibold mb-6 uppercase text-[10px] tracking-[0.2em]">
                                {f.role}
                            </p>

                            {/* View Profile Button */}
                            <button className="w-full py-3 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all duration-300 font-medium">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}