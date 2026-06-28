"use client";
import React, { useEffect, useState } from 'react';

const AdminDashboardHomePage = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTasks: 0,
        totalRevenue: 0,
        activeTasks: 0
    });

    useEffect(() => {
        // ব্যাকএন্ড থেকে ডাটা ফেচ করা
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin-stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error("Error fetching admin stats:", err));
    }, []);

    const overviewCards = [
        { title: "Total Users", value: stats.totalUsers, icon: "👥", color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Total Tasks", value: stats.totalTasks, icon: "📋", color: "text-purple-600", bg: "bg-purple-50" },
        { title: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: "💰", color: "text-green-600", bg: "bg-green-50" },
        { title: "Active Tasks", value: stats.activeTasks, icon: "🚀", color: "text-orange-600", bg: "bg-orange-50" },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Admin Overview</h1>
                <p className="text-gray-500">Platform performance and statistics at a glance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewCards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">{card.title}</p>
                            <h3 className="text-3xl font-bold mt-2 text-gray-800">{card.value}</h3>
                        </div>
                        <div className={`p-4 rounded-xl ${card.bg} ${card.color} text-2xl`}>
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* এখানে আপনি চাইলে দ্রুত কোনো চার্ট বা সাম্প্রতিক কার্যক্রম যোগ করতে পারেন */}
        </div>
    );
};

export default AdminDashboardHomePage;