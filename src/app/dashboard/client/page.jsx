"use client";
import React, { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client"; // আপনার অথেনটিকেশন পাথ অনুযায়ী ঠিক করুন

const ClientDashboardHomePage = () => {
    const { data: session } = authClient.useSession();
    const [stats, setStats] = useState({
        totalTasks: 0,
        openTasks: 0,
        inProgress: 0,
        totalSpent: 0
    });

    useEffect(() => {
        if (session?.user?.email) {
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client-stats?email=${session.user.email}`)
                .then(res => res.json())
                .then(data => setStats(data))
                .catch(err => console.error("Error:", err));
        }
    }, [session]);

    const statsData = [
        { title: "Total Tasks", value: stats.totalTasks, sub: "All tasks created", icon: "📋" },
        { title: "Open Tasks", value: stats.openTasks, sub: "Awaiting proposals", icon: "⏱️" },
        { title: "In Progress", value: stats.inProgress, sub: "Currently being worked on", icon: "✅" },
        { title: "Total Spent", value: `$${stats.totalSpent}`, sub: "Total money paid", icon: "💰" }
    ];

    return (
        <div className="min-h-screen bg-[#fafafa] p-8">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Client Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your tasks and find talented freelancers.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statsData.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wide">{item.title}</p>
                            <h3 className="text-4xl font-extrabold text-gray-900">{item.value}</h3>
                            <p className="text-gray-400 text-xs mt-3">{item.sub}</p>
                        </div>
                        <div className="p-2.5 bg-orange-50 rounded-xl text-xl">{item.icon}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientDashboardHomePage;