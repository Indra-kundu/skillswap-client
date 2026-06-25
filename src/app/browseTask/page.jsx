"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BrowseTasksPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-tasks`)
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">All Available Tasks</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tasks.map(task => (
                    <div key={task._id} className="p-6 border rounded-xl bg-white shadow-sm">
                        <h3 className="font-bold text-lg">{task.title}</h3>
                        <p className="text-sm text-gray-500">Client: {task.client_name}</p>
                        <p className="font-bold text-orange-600">${task.budget}</p>
                        <p className="text-xs">Deadline: {task.deadline}</p>
                        <Link href={`/tasks/${task._id}`}>
                            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}