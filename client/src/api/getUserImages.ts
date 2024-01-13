import {API_URL} from './config';

export async function getUserImages(userId: string | undefined) {
    const res = await fetch(`${API_URL}/userImages/${userId}`);

    return res.json();
}
