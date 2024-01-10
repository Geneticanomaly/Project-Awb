import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function getUsersChat(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    const currentUserId = req.params.loggedUserId;
    const chattingUserId = req.params.userId;

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const messages = database.collection('messages');

        // Get messages between two users based on given ID's
        const foundMessages = await messages
            .find({from_userId: currentUserId, to_userId: chattingUserId})
            .toArray();

        if (!foundMessages) return res.status(400).json({message: 'No messages found!'});

        return res.status(201).json(foundMessages);
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

export default getUsersChat;
