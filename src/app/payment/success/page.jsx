"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [details, setDetails] = useState(null);

    const sessionId = searchParams.get('session_id');
    const proposalId = searchParams.get('proposal_id');
    const taskId = searchParams.get('task_id');

    useEffect(() => {
        if (!sessionId || !proposalId || !taskId) {
            setError(true);
            setLoading(false);
            return;
        }

        const confirmPayment = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/confirm-session`, {
                    method: 'PATCH',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ proposalId, taskId, sessionId })
                });

                if (res.ok) {
                    const data = await res.json();
                    setDetails(data);
                } else {
                    setError(true);
                }
            } catch (err) { // এখানে err লিখুন
                console.error("Error confirming payment:", err);
                setError(true);
            } finally {
                setLoading(false); // এটি এখন confirmPayment ফাংশনের ভেতরে
            }
        };

        confirmPayment();
    }, [sessionId, proposalId, taskId]);

    if (loading) return <div className="text-center py-20 text-white">Verifying Payment...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Something went wrong!</div>;

    return (
        <div className="min-h-screen bg-[#1e1b2e] flex items-center justify-center p-6 text-white">
            <div className="bg-[#2d2a45] p-10 rounded-2xl shadow-2xl border border-violet-500/30 max-w-lg w-full text-center">
                <div className="text-6xl mb-6">✅</div>
                <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
                <div className="bg-[#1e1b2e] p-6 rounded-xl text-left space-y-3 mb-8">
                    <p className="text-slate-400 text-sm">Paid Task: <span className="text-white font-semibold">{details?.taskTitle || "N/A"}</span></p>
                    <p className="text-slate-400 text-sm">Price: <span className="text-pink-400 font-bold">${details?.price || "N/A"}</span></p>
                </div>
                <Link href="/dashboard/client" className="block bg-pink-500 hover:bg-pink-600 py-3 rounded-lg font-bold transition">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}