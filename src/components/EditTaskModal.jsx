"use client";

export default function EditTaskModal({ task, onClose, onUpdate }) {

    const handleSave = async (e) => {
        e.preventDefault();

        // ফর্ম থেকে ডেটা সংগ্রহ
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tasks/${task._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (res.ok) {
                // সাকসেস হলে মডাল বন্ধ হবে এবং লিস্ট আপডেট হবে
                onUpdate({ ...task, ...updatedData });
            } else {
                alert("Failed to update task.");
            }
        } catch (error) {
            console.error("Update Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Task</h2>

                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input name="title" defaultValue={task.title} required className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" defaultValue={task.description} required className="w-full border p-2.5 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
                            <input name="budget" type="number" defaultValue={task.budget} required className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deadline</label>
                            <input name="deadline" type="date" defaultValue={task.deadline} required className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border text-gray-600 font-semibold hover:bg-gray-50">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}