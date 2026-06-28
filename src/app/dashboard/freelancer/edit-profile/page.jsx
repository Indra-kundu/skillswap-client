"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function EditProfilePage() {
    const { data: session } = authClient.useSession();
    const [profile, setProfile] = useState({ name: "", bio: "", skills: "" });

    // ১. ইউজারের প্রোফাইল ডাটা লোড করা
    useEffect(() => {
        if (session?.user?.email) {
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/freelancer/${session.user.email}`)
                .then(res => res.json())
                .then(data => setProfile(data));
        }
    }, [session]);

    // ২. ফর্ম আপডেট হ্যান্ডলার
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/freelancer/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email, ...profile }),
        });
        alert("Profile updated successfully!");
    };

    return (
        <div className="bg-white p-8 rounded-2xl border shadow-sm max-w-2xl">
            <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        className="w-full p-3 border rounded-xl"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                </div>

                {/* Bio Field */}
                <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                        className="w-full p-3 border rounded-xl"
                        rows="3"
                        value={profile.bio || ""}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        placeholder="Tell us about your expertise..."
                    />
                </div>

                {/* Skills Field */}
                <div>
                    <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                    <input
                        className="w-full p-3 border rounded-xl"
                        value={profile.skills ? (Array.isArray(profile.skills) ? profile.skills.join(", ") : profile.skills) : ""}
                        onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                        placeholder="e.g. React, Node.js, MongoDB"
                    />
                </div>

                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                    Save Changes
                </button>
            </form>
        </div>
    );
}