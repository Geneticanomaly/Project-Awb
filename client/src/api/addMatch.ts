import {API_URL} from './config';

export async function addMatch(userId: string, matchedUserId: string) {
    const res = await fetch(`${API_URL}/addmatch`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({userId: userId, matchedUserId: matchedUserId}),
    });
    return res.json();
}
