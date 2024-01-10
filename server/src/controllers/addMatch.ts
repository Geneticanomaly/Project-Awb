import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function addMatch(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    const userId = req.body.userId;
    const matchedUserId = req.body.matchedUserId;

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const users = database.collection('users');

        // Push the new match to the matches array.
        const updatedData = {
            $push: {matches: {user_id: matchedUserId}},
        };

        // Update the user with a specific user ID
        const updatedUser = await users.updateOne({user_id: userId}, updatedData);

        return res.status(201).json(updatedUser);
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

export default addMatch;
