import {Request, Response} from 'express';
import {MongoClient, Timestamp} from 'mongodb';

async function addMessage(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);

    try {
        await client.connect();
        const database = client.db('app-data');
        const messages = database.collection('messages');
        console.log('Message body:', req.body);

        const messageData = {
            timestamp: req.body.timestamp,
            from_userId: req.body.currentUserId,
            to_userId: req.body.otherUserId,
            message: req.body.messageContent,
        };

        const insertedMessage = await messages.insertOne(messageData);

        console.log('Inserted message:', insertedMessage);

        return res.status(201).json(insertedMessage);
    } finally {
        await client.close();
    }
}

export default addMessage;
