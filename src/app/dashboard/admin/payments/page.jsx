"use client";
import { useEffect, useState } from 'react';

export default function TransactionsHistory() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/payments`)
            .then(res => res.json())
            .then(data => setPayments(data));
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Transactions History</h2>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Client Email</th>
                            <th className="p-4 font-semibold text-gray-600">Freelancer Email</th>
                            <th className="p-4 font-semibold text-gray-600">Payout Size</th>
                            <th className="p-4 font-semibold text-gray-600">Payment Date</th>
                            <th className="p-4 font-semibold text-gray-600">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id} className="border-b hover:bg-gray-50">
                                {/* ইমেইলগুলো ডাটাবেস অনুযায়ী চেক করুন */}
                                <td className="p-4">{payment.clientEmail || "N/A"}</td>
                                <td className="p-4">{payment.freelancerEmail || "N/A"}</td>
                                <td className="p-4 font-bold text-green-600">${payment.amount || 0}</td>

                                {/* তারিখটি এভাবে হ্যান্ডেল করুন */}
                                <td className="p-4 text-gray-500">
                                    {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : "No Date"}
                                </td>

                                <td className="p-4">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {payment.payment_status || "Success"}
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