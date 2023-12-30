import {API_URL} from './config';
import {User} from './User';

async function updateUser(formData: User) {
    const res = await fetch(`${API_URL}/user`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            formData,
        }),
    });

    console.log('MY FORM DATA:', formData);

    return res.json();
}

export default updateUser;
