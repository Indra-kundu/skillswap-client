"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client"; // আপনার অথেন্টিকশন পাথ অনুযায়ী

export default function TaskDetailsPage() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/${id}`)
            .then(res => res.json())
            .then(data => setTask(data));
    }, [id]);

    const handleProposalSubmit = async (e) => {
        if (user?.email === task.client_email) {
            alert("You cannot apply to your own task!");
            return;
        }
        e.preventDefault();
        if (!task) {
            alert("Task details are still loading, please wait.");
            return;
        }
        const form = e.target;

        const proposalData = {
            task_id: id,
            client_email: task.client_email,
            freelancer_email: user?.email,
            freelancer_name: user?.name,
            budget: form.budget.value,
            completion_days: form.days.value,
            note: form.note.value,
            status: "Pending"
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/proposals`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(proposalData)
        });

        if (res.ok) {
            alert("Proposal submitted successfully!");
            form.reset();
        }
    };

    if (!task) return <div className="text-center py-20 text-purple-200">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#1e1b2e] text-white p-8 md:p-16">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <h1 className="text-4xl font-bold text-white capitalize">{task.title}</h1>
                    <div className="bg-[#2d2a45] p-8 rounded-xl border border-violet-500/30">
                        <h2 className="text-xl font-semibold mb-4 text-pink-400">Description</h2>
                        <p className="text-slate-300 leading-relaxed">{task.description}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#2d2a45] p-6 rounded-xl border border-violet-500/30 shadow-lg">
                        <h3 className="text-xs text-pink-400 uppercase tracking-widest mb-4">Project Details</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between border-b border-violet-500/20 pb-2">
                                <span className="text-slate-400">Category:</span>
                                <span className="font-bold text-white">{task.category}</span>
                            </div>
                            <div className="flex justify-between border-b border-violet-500/20 pb-2">
                                <span className="text-slate-400">Budget:</span>
                                <span className="text-pink-400 font-bold">${task.budget}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Deadline:</span>
                                <span className="font-bold text-white">{task.deadline}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto mt-12 bg-[#2d2a45] p-8 rounded-xl border-l-4 border-pink-500">
                <h2 className="text-2xl font-bold mb-6 text-white">Submit Your Proposal</h2>
                <form onSubmit={handleProposalSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input name="budget" type="number" placeholder="Your Budget ($)" required className="w-full p-3 rounded bg-[#1e1b2e] border border-violet-500/30 text-white" />
                        <input name="days" type="number" placeholder="Days to Complete" required className="w-full p-3 rounded bg-[#1e1b2e] border border-violet-500/30 text-white" />
                    </div>
                    <textarea name="note" placeholder="Write a note to the client..." required className="w-full p-3 rounded bg-[#1e1b2e] border border-violet-500/30 text-white" rows="4"></textarea>
                    <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-bold transition">
                        Submit Proposal
                    </button>
                </form>
            </div>
        </div>
    );
}