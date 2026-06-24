import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const Task = async (task) => {
    const { data: token } = await authClient.token()
    console.log(token.token);
    const res = await fetch(
        `${baseUrl}/client/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(task)
    }
    );
    const data = await res.json()
    return data;
};
