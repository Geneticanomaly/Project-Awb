import {API_URL} from './config';

export async function getMatchedUsers(userIds: string[] | undefined) {
    try {
        const res = await fetch(`${API_URL}/matchedUsers/${userIds}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.log('Error fetching matched users');
    }
}
