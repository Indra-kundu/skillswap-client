"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FileText, Clock, CheckCircle, DollarSign } from "lucide-react"; // আইকনগুলোর জন্য

const FreelancerDashboardHomePage = () => {
    const { data: session } = authClient.useSession();
    const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, earnings: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.email) {
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/${session.user.email}`)
                .then(res => res.json())
                .then(data => {
                    const total = data.length;
                    const pending = data.filter(p => p.status === 'Pending').length;
                    const accepted = data.filter(p => p.status === 'Accepted').length;

                    // শুধু Accepted কাজের বাজেট যোগ করছি
                    const earnings = data
                        .filter(p => p.status === 'Accepted')
                        .reduce((sum, p) => sum + parseFloat(p.budget || 0), 0);

                    setStats({ total, pending, accepted, earnings });
                    setLoading(false);
                });
        }
    }, [session]);

    if (loading) return <div className="p-8">Loading dashboard...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">Freelancer Dashboard</h1>
            <p className="text-gray-500 mb-8">Track your proposals and earnings</p>

            {/* স্ট্যাটস কার্ডসমূহ */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Proposals" value={stats.total} icon={<FileText className="text-orange-500" />} />
                <StatCard title="Pending" value={stats.pending} icon={<Clock className="text-yellow-500" />} />
                <StatCard title="Accepted" value={stats.accepted} icon={<CheckCircle className="text-green-500" />} />
                <StatCard title="Total Earned" value={`$${stats.earnings}`} icon={<DollarSign className="text-blue-500" />} />
            </div>

            {/* বাকি কন্টেন্ট (যেমন: Recent Proposals) এখানে যোগ করতে পারেন */}
        </div>
    );
};

// ছোট একটি সাব-কম্পোনেন্ট কার্ডের ডিজাইনের জন্য
const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
            <p className="text-gray-500 text-sm mb-1">{title}</p>
            <h2 className="text-3xl font-bold">{value}</h2>
        </div>
        <div className="bg-gray-50 p-3 rounded-full">{icon}</div>
    </div>
);

export default FreelancerDashboardHomePage;