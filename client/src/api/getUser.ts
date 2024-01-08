import {User} from '../../typings';
import {API_URL} from './config';

export async function getUser(userId: string | undefined): Promise<User> {
    const res = await fetch(`${API_URL}/user/${userId}`);
    return res.json();
}
