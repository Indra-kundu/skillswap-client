"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BrowseTasksPage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // আপনার সার্ভার থেকে শুধুমাত্র ওপেন টাস্কগুলো আনুন
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/open-tasks`)
            .then(res => res.json())
            .then(data => {
                setTasks(Array.isArray(data) ? data : []);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-20 text-white">Loading...</div>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-extrabold mb-10 text-white">Browse Available Tasks</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tasks.map((task) => (
                    <div key={task._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                        {/* Status Badge */}
                        <div className="flex justify-between items-start mb-4">
                            <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full border border-green-200">
                                {task.status || "Open"}
                            </span>
                        </div>

                        {/* Task Title & Client */}
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{task.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">Client: {task.client_name || "N/A"}</p>

                        {/* Budget & Deadline */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-2xl font-bold text-orange-600">${task.budget}</p>
                            <p className="text-xs text-gray-400">Deadline: {task.deadline}</p>
                        </div>

                        {/* View Details Button */}
                        <Link href={`/tasks/${task._id}`}>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}