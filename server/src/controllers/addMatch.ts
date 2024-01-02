import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function addMatch(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    const userId = req.body.userId;
    const matchedUserId = req.body.matchedUserId;

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const updatedData = {
            $push: {matches: {user_id: matchedUserId}},
        };

        const updatedUser = await users.updateOne({user_id: userId}, updatedData);

        return res.status(201).json(updatedUser);
    } finally {
        await client.close();
    }
}

export default addMatch;
