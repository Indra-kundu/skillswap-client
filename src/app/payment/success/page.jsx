"use client";
export const dynamic = 'force-dynamic';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// ১. ডাইনামিক রেন্ডারিং নিশ্চিত করা

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const proposalId = searchParams.get('proposal_id');
    const taskId = searchParams.get('task_id');

    useEffect(() => {
        if (sessionId && proposalId && taskId) {
            // ডাটাবেস আপডেট করার জন্য কল করুন
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/confirm-session`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ sessionId, proposalId, taskId })
            })
                .then(res => res.json())
                .then(data => console.log("Payment Confirmed", data))
                .catch(err => console.error("Error confirming payment", err));
        }
    }, [sessionId, proposalId, taskId]);

    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
            <p>Your task is now in progress.</p>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="p-10">Processing your payment...</div>}>
            <SuccessContent />
        </Suspense>
    );
}