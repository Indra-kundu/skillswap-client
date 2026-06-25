"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProposalsPage() {
    const [proposals, setProposals] = useState([]);
    const { data: session } = authClient.useSession();
    const email = session?.user?.email;

    useEffect(() => {
        if (!email) return;
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/client/${email}`)
            .then(res => res.json())
            .then(data => setProposals(data));
    }, [email]);



    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Manage Proposals</h1>

            {proposals.length === 0 ? (
                <p>No proposals received yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 border">Freelancer</th>
                                <th className="p-3 border">Budget</th>
                                <th className="p-3 border">Message</th>
                                <th className="p-3 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proposals.map(p => (
                                <tr key={p._id} className="border-b">
                                    <td className="p-3">{p.freelancer_name}</td>
                                    <td className="p-3">${p.budget}</td>
                                    <td className="p-3">{p.note}</td>
                                    <td className="p-3 flex gap-2">
                                        <button className="bg-green-500 text-white px-3 py-1 rounded">Accept</button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}