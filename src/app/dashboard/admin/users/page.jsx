"use client";
import { useEffect, useState } from 'react';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    const handleStatusUpdate = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ isBlocked: newStatus })
        });
        // UI আপডেট করার জন্য লিস্টটি রিফ্রেশ করুন
        setUsers(users.map(u => u._id === id ? { ...u, isBlocked: newStatus } : u));
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
            <table className="w-full bg-white rounded-xl shadow-sm border">
                <thead>
                    <tr className="border-b text-left">
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .filter(user => user.role !== 'admin') // এই লাইনটি অ্যাডমিনকে লিস্ট থেকে বাদ দিবে
                        .map(user => (
                            <tr key={user._id} className="border-b">
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">{user.role}</td>
                                <td className="p-4">{user.isBlocked ? "Blocked" : "Active"}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleStatusUpdate(user._id, user.isBlocked)}
                                        className={`px-4 py-2 rounded ${user.isBlocked ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                    >
                                        {user.isBlocked ? "Unblock" : "Block"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}