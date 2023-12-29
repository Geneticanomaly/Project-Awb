import {API_URL} from './config';

async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({email: email, password: password}),
    });

    return res.json();
}

export default loginUser;
