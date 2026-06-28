"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import EditTaskModal from "@/components/EditTaskModal";

export default function MyTaskPage() {


    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // ২. মডাল কন্ট্রোল করার জন্য স্টেট
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

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


    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-green-100 text-green-700';
            case 'In Progress': return 'bg-yellow-100 text-yellow-700';
            case 'Completed': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setIsEditing(true);
    };

    const handleDelete = async (taskId) => {
        if (!confirm("Are you sure you want to delete this task?")) return;

        try {
            // ১. আগে চেক করুন প্রপোজাল আছে কি না
            const checkRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/proposals/check/${taskId}`);
            const { hasApproved } = await checkRes.json();

            if (hasApproved) {
                alert("Cannot delete: A proposal has already been approved!");
                return;
            }

            // ২. ডিলিট অপারেশন
            const delRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/${taskId}`, {
                method: 'DELETE'
            });

            if (delRes.ok) {
                setTasks(tasks.filter(t => t._id !== taskId));
                alert("Task deleted successfully.");
            }
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };


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
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getStatusColor(task.status)}`}>
                                    {task.status}
                                </span>
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
                            <div className="flex gap-2 mt-6">
                                {/* এডিট বাটন - শুধু Open স্ট্যাটাসে দেখা যাবে */}
                                {task.status === 'Open' && (
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                )}

                                {/* ডিলিট বাটন */}
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    disabled={task.status === 'In Progress'} // ইন প্রোগ্রেস থাকলে ডিলিট করা যাবে না
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold ${task.status === 'In Progress' ? 'bg-gray-400' : 'bg-red-600'} text-white`}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isEditing && (
                <EditTaskModal
                    task={selectedTask}
                    onClose={() => setIsEditing(false)}
                    // ৫. আপডেট হওয়ার পর লিস্ট রিফ্রেশ করার লজিক
                    onUpdate={(updatedTask) => {
                        setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
                        setIsEditing(false);
                        alert("Task updated successfully!");
                    }}
                />
            )}
        </div>
    );
}