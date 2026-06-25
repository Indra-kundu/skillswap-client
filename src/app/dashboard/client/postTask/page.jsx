"use client";
import { Task } from "@/lib/api/tasks";
import { authClient } from "@/lib/auth-client";
import React from 'react';
const PostTask = () => {
    // এখানে async ব্যবহার করা যাবে না
    const { data: session } = authClient.useSession();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const taskData = Object.fromEntries(formData.entries());

        // সেশন থেকে ইমেইল সেট করা
        taskData.client_email = session?.user?.email;
        taskData.client_name = session?.user?.name; // নাম যোগ করলাম
        taskData.status = "Open";
        try {
            const result = await Task(taskData);
            console.log("Result:", result);

            if (result.acknowledged) {
                alert("Task posted successfully!");
                e.target.reset();
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-sm border rounded-xl">
            <h2 className="text-2xl font-bold mb-2">Post a New Task</h2>
            <p className="text-gray-500 mb-6">Describe your task and set a budget to find freelancers</p>

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Task Title</label>
                    <input name="title" required className="w-full border p-2 rounded-lg" placeholder="e.g. Logo Design" />
                </div>

                <div>
                    <label className="block font-medium mb-1">Category</label>
                    <select name="category" className="w-full border p-2 rounded-lg">
                        <option value="Design">Design</option>
                        <option value="Writing">Writing</option>
                        <option value="Development">Development</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea name="description" required className="w-full border p-2 rounded-lg h-24" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Budget (USD)</label>
                        <input type="number" name="budget" required className="w-full border p-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Deadline</label>
                        <input type="date" name="deadline" required className="w-full border p-2 rounded-lg" />
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button type="button" className="px-6 py-2 border rounded-lg">Cancel</button>
                    <button type="submit" className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-bold">Post Task</button>
                </div>
            </form>
        </div>
    );

};

export default PostTask;