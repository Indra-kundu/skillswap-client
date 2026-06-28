"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; // এটি যোগ করুন

export default function ProposalsPage() {
    const [proposals, setProposals] = useState([]);
    const router = useRouter(); // রাউটার ইনিশিয়ালাইজ করুন
    const { data: session } = authClient.useSession();
    const email = session?.user?.email;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) return;
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/client/${email}`)
            .then(res => res.json())
            .then(data => {
                setProposals(data);
                setLoading(false);
            });
    }, [email]);

    const handleAccept = (proposal) => {
        console.log("Proposal object:", proposal); // এখানে দেখুন task_id আছে কি না
        // পেমেন্ট পেজে রিডাইরেক্ট এবং ডাটা পাঠানো
        router.push(`/payment/checkout?proposalId=${proposal._id}&taskId=${proposal.task_id}&price=${proposal.budget}&freelancer=${proposal.freelancer_email}`);
    };

    // Reject হ্যান্ডলার
    const handleReject = async (proposalId) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/${proposalId}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status: "Rejected" })
        });
        if (res.ok) {
            // লিস্ট আপডেট করা
            setProposals(prev => prev.filter(p => p._id !== proposalId));
        }
    };

    return (
        <div className="p-8">
            {/* এখানে লোডিং কন্ডিশন ঠিক করা হয়েছে */}
            {loading ? (
                <p>Loading proposals...</p>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-6">Manage Proposals</h1>

                    {proposals.length === 0 ? (
                        <p>No proposals received yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-3 border">Task Title</th>
                                        <th className="p-3 border">Freelancer</th>
                                        <th className="p-3 border">Budget</th>
                                        <th className="p-3 border">Message</th>
                                        <th className="p-3 border">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proposals.map(p => (
                                        <tr key={p._id} className="border-b">
                                            <td className="p-3">{p.task_title || "N/A"}</td>
                                            <td className="p-3">{p.freelancer_name}</td>
                                            <td className="p-3">${p.budget}</td>
                                            <td className="p-3">{p.note}</td>
                                            <td className="p-3 flex gap-2">
                                                <button onClick={() => handleAccept(p)} className="bg-green-500 text-white px-3 py-1 rounded">Accept</button>
                                                <button onClick={() => handleReject(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}