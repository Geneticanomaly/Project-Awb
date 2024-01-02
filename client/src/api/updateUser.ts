import {API_URL} from './config';

type FormData = {
    user_id: string;
    first_name: string;
    last_name: string;
    dob_day: string;
    dob_month: string;
    dob_year: string;
    gender: string;
    show_gender: string;
    about: string;
    url: string;
    matches: string[];
};

async function updateUser(formData: FormData) {
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
