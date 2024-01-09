import {API_URL} from './config';

export async function addMessage(
    currentUserId: string,
    otherUserId: string | undefined,
    messageContent: string,
    timestamp: string
) {
    const res = await fetch(`${API_URL}/chat/addMessage`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            currentUserId: currentUserId,
            otherUserId: otherUserId,
            messageContent: messageContent,
            timestamp: timestamp,
        }),
    });
    return res.json();
}
