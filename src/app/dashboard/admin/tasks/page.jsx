"use client";
import { useEffect, useState } from 'react';

export default function ManageTasks() {
    // এখানে users এর বদলে tasks স্টেট ব্যবহার করতে হবে
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this task?")) return;

        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/${id}`, { method: 'DELETE' });
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-8">Manage All Tasks</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* এখানে tasks ম্যাপ করতে হবে */}
                {tasks.map(task => (
                    <div key={task._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{task.title}</h3>
                        <p className="text-gray-500 text-sm mb-4">{task.description}</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-medium">{task.status}</span>
                            <span className="font-bold text-gray-900">${task.budget}</span>
                        </div>
                        <button
                            onClick={() => handleDelete(task._id)}
                            className="mt-6 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition-colors"
                        >
                            Delete Task
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}