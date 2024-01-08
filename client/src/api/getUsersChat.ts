import {API_URL} from './config';

export async function getUsersChat(userId: string | undefined, loggedUserId: string | undefined) {
    const res = await fetch(`${API_URL}/chat/${userId}/${loggedUserId}`);
    return res.json();
}
