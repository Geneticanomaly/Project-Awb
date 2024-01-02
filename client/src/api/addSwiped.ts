import {API_URL} from './config';

export async function addSwiped(userId: string, swipedUserId: string) {
    const res = await fetch(`${API_URL}/addmatch`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({userId: userId, swipedUserId: swipedUserId}),
    });
    return res.json();
}
