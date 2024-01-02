import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function addSwiped(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    const userId = req.body.userId;
    const swipedUserId = req.body.swipedUserId;

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const updatedData = {
            $push: {swiped_right: {user_id: swipedUserId}},
        };

        const updatedUser = await users.updateOne({user_id: userId}, updatedData);

        return res.status(201).json(updatedUser);
    } finally {
        await client.close();
    }
}

export default addSwiped;
