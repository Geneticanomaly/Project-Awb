import {API_URL} from './config';

export async function editProfileInfo(
    userId: string | undefined,
    first_name: string,
    last_name: string,
    about: string
) {
    const res = await fetch(`${API_URL}/profile/${userId}/editProfileInfo`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({first_name: first_name, last_name: last_name, about: about}),
    });
    return res.json();
}
