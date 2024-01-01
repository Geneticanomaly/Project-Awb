import {API_URL} from './config';

export async function getUsersByGender(gender: string | undefined) {
    const res = await fetch(`${API_URL}/gendered-users/${gender}`);
    return res.json();
}
