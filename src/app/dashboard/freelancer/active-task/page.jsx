"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ActiveProjectsPage() {
    const { data: session } = authClient.useSession();
    const [activeProjects, setActiveProjects] = useState([]);

    useEffect(() => {
        if (session?.user?.email) {
            // প্রপোজালগুলো ফেচ করে ফিল্টার করছি
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/${session.user.email}`)
                .then(res => res.json())
                .then(async (data) => {
                    // শুধুমাত্র Accepted গুলো আলাদা করছি
                    const accepted = data.filter(p => p.status === 'Accepted');

                    // এবার টাইটেল আনার জন্য আগের লজিকটি ব্যবহার করছি
                    const projectsWithTitle = await Promise.all(
                        accepted.map(async (p) => {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/task-title/${p.task_id}`);
                            const titleData = await res.json();
                            return { ...p, task_title: titleData.title };
                        })
                    );
                    setActiveProjects(projectsWithTitle);
                });
        }
    }, [session]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Active Projects</h1>

            {activeProjects.length === 0 ? (
                <p className="text-gray-500">No active projects yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeProjects.map((project) => (
                        <div key={project._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                            <h3 className="font-bold text-xl mb-2">{project.task_title}</h3>
                            <p className="text-sm text-gray-500 mb-4">Budget: ${project.budget}</p>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                {project.status}
                            </span>
                            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700">
                                View Project
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}