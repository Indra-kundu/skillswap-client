"use client";
export const dynamic = 'force-dynamic';

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// বিল্ড এরর এড়াতে ডাইনামিক রেন্ডারিং নিশ্চিত করা

function CheckoutContent() {
    const searchParams = useSearchParams();
    const proposalId = searchParams.get('proposalId');
    const taskId = searchParams.get('taskId');
    const price = searchParams.get('price');

    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/create-checkout-session`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ price, proposalId, taskId })
            });
            const { url } = await res.json();
            if (url) window.location.href = url;
        } catch (error) {
            console.error("Payment initiation failed", error);
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePay}
            disabled={loading}
            className={`p-3 rounded text-white ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
        >
            {loading ? "Processing..." : `Pay $${price || '0'}`}
        </button>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="p-4">Loading payment details...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}