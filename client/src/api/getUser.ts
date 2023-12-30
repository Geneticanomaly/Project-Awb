import {API_URL} from './config';

export type User = {
    _id: string;
    user_id: string;
    email: string;
    password: string;
    about: string;
    dob_day: string;
    dob_month: string;
    dob_year: string;
    first_name: string;
    gender: string;
    last_name: string;
    matches: [string];
    show_gender: string;
    url: string;
};

export async function getUser(userId: string): Promise<User> {
    const res = await fetch(`${API_URL}/user/${userId}`);
    return res.json();
}
