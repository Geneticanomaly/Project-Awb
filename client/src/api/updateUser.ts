import {API_URL} from './config';

export async function updateUser(formData: FormData) {
    const res = await fetch(`${API_URL}/user`, {
        method: 'POST',
        body: formData,
    });

    return res.json();
}
