// app/payment/checkout/page.jsx
"use client";
import { useState } from "react"; // useState ইমপোর্ট করুন
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const proposalId = searchParams.get('proposalId');
    const taskId = searchParams.get('taskId');
    const price = searchParams.get('price');

    const [loading, setLoading] = useState(false);
    const handlePay = async () => {
        setLoading(true); // এটি যোগ করুন!
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/create-checkout-session`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ price, proposalId, taskId })
            });
            const { url } = await res.json();
            window.location.href = url;
        } catch (error) {
            console.error("Payment initiation failed", error);
            setLoading(false); // এরর হলে আবার বাটন স্বাভাবিক করে দিন
        }
    };

    return (
        <button
            onClick={handlePay}
            disabled={loading} // লোডিং থাকলে বাটনটি ডিজেবল হয়ে যাবে
            className={`p-3 rounded text-white ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
        >
            {loading ? "Processing..." : `Pay $${price}`}
        </button>
    );
}