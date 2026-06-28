"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function MyProposalsPage() {
    const { data: session } = authClient.useSession();
    const [proposals, setProposals] = useState([]);

    // useEffect এর ভেতরে:
    useEffect(() => {
        if (session?.user?.email) {
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/${session.user.email}`)
                .then(res => res.json())
                .then(async (proposalsData) => {
                    // প্রতিটি প্রপোজালের জন্য আলাদাভাবে টাইটেল ফেচ করা
                    const updatedProposals = await Promise.all(
                        proposalsData.map(async (p) => {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/task-title/${p.task_id}`);
                            const data = await res.json();
                            return { ...p, task_title: data.title };
                        })
                    );
                    setProposals(updatedProposals);
                });
        }
    }, [session]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">My Proposals</h1>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                <table className="w-full text-left">
                    {/* টেবিল হেডার */}
                    <thead>
                        <tr>
                            <th className="p-4 border-b">Task Title</th>
                            <th className="p-4 border-b">Budget</th>
                            <th className="p-4 border-b">Status</th>
                        </tr>
                    </thead>
                    {/* টেবিল বডি */}
                    <tbody>
                        {proposals.map((p) => (
                            <tr key={p._id} className="border-b">
                                <td className="p-4 font-medium">{p.task_title}</td>
                                <td className="p-4">${p.budget}</td>
                                <td className="p-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                        {p.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}