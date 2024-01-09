import {API_URL} from './config';

export async function createUser(email: string, password: string) {
    // Get current date
    const currentDate = new Date();
    const currentTime = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);
    const formattedDate = currentTime.toISOString();

    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({email: email, password: password, date: formattedDate}),
    });

    return res.json();
}
