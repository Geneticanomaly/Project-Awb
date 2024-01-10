import {Request, Response} from 'express';
import {MongoClient, Timestamp} from 'mongodb';

async function addMessage(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection messages
        const messages = database.collection('messages');

        // Create a messageData object to be inserted into the database
        const messageData = {
            timestamp: req.body.timestamp,
            from_userId: req.body.currentUserId,
            to_userId: req.body.otherUserId,
            message: req.body.messageContent,
        };

        // Insert the message to the messages collection
        const insertedMessage = await messages.insertOne(messageData);

        console.log('Inserted message:', insertedMessage);

        return res.status(201).json(insertedMessage);
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

export default addMessage;
