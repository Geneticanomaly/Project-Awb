import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function getUser(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    try {
        const database = client.db('app-data');
        const users = database.collection('users');

        const user = await users.findOne({user_id: req.params.userId});

        if (!user) {
            return res.status(403).json('No such user found!');
        }
        console.log('USER:', user);
        return res.status(201).json(user);
    } finally {
        await client.close();
    }
}

export default getUser;
