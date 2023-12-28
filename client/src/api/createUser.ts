import {API_URL} from './config';

export async function createUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({email: email, password: password}),
    });

    return res.json();
}
