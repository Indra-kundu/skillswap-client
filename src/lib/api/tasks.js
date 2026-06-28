import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const Task = async (task) => {
    try {
        const { data: token } = await authClient.token();

        const res = await fetch(`${baseUrl}/client/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify(task)
        });

        // এখানে চেক করুন রেসপন্স ok কি না
        if (!res.ok) {
            const errorText = await res.text(); // JSON না হলে টেক্সট হিসেবে দেখুন
            console.error("Server Error:", errorText);
            throw new Error("Failed to post task");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Task Posting Error:", error);
        throw error;
    }
};