"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function EarningsPage() {
    const { data: session } = authClient.useSession();
    // ১. একটি স্টেট তৈরি করছি ডাটা রাখার জন্য
    const [proposals, setProposals] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    useEffect(() => {
        if (session?.user?.email) {
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/${session.user.email}`)
                .then(res => res.json())
                .then(async (data) => {
                    // প্রতিটি প্রপোজালের জন্য টাস্ক টাইটেল ফেচ করা হচ্ছে
                    const dataWithTitles = await Promise.all(
                        data.map(async (p) => {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/task-title/${p.task_id}`);
                            const titleData = await res.json();
                            return { ...p, task_title: titleData.title };
                        })
                    );

                    setProposals(dataWithTitles); // টাইটেলসহ ডাটা সেট করা হলো

                    const total = dataWithTitles
                        .filter(p => p.status === 'Accepted')
                        .reduce((sum, p) => sum + parseFloat(p.budget || 0), 0);

                    setTotalEarnings(total);
                });
        }
    }, [session]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Earnings</h1>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-sm mb-8">
                <p className="text-gray-500 mb-2">Total Lifetime Earnings</p>
                <h2 className="text-4xl font-bold text-green-600">${totalEarnings}</h2>
            </div>

            {/* ৩. এখন 'data' এর বদলে 'proposals' স্টেটটি ব্যবহার করছি */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-2xl">
                <h3 className="font-semibold text-lg mb-4 text-gray-700">Project Earnings History</h3>
                <table className="w-full text-left border-collapse">
                    <tbody>
                        {proposals.filter(p => p.status === 'Accepted').map((p, index) => (
                            <tr key={p._id} className="group border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-2 text-gray-600 font-medium">
                                    {p.task_title || "Untitled Project"}
                                </td>
                                <td className="py-4 px-2 font-bold text-right text-green-600">
                                    +${p.budget}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {proposals.filter(p => p.status === 'Accepted').length === 0 && (
                    <p className="text-gray-400 text-center py-4">No completed projects found.</p>
                )}
            </div>
        </div>
    );
}