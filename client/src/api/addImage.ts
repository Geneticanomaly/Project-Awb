import {API_URL} from './config';

export async function addImage(userId: string | undefined, formData: FormData) {
    const res = await fetch(`${API_URL}/profile/${userId}/addImage`, {
        method: 'POST',
        body: formData,
    });
    return res.json();
}
