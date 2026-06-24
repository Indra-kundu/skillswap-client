"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function MyTaskPage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = authClient.useSession();
    const email = session?.user?.email;

    useEffect(() => {
        if (!email) return;
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client/tasks/${email}`)
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching tasks:", err);
                setLoading(false);
            });
    }, [email]);

    if (loading) return <div className="text-center mt-10">Loading your tasks...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-8">My Posted Tasks</h2>

            {tasks.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-xl shadow-sm border">
                    <p className="text-gray-500">No tasks found. Create your first task!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <div key={task._id} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                                    {task.title}
                                </h3>
                                <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                    {task.category}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-6 line-clamp-2 h-10">
                                {task.description}
                            </p>

                            {/* Info Grid */}
                            <div className="space-y-3 border-t pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Client:</span>
                                    <span className="font-medium text-gray-800">{task.client_name || "N/A"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Budget:</span>
                                    <span className="font-bold text-gray-900">${task.budget}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Deadline:</span>
                                    <span className="font-medium text-gray-800">{task.deadline}</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full mt-6 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}