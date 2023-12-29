import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function getUsers(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const returnedUsers = await users.find().toArray();
        res.send('Users: ' + JSON.stringify(returnedUsers));
    } finally {
        await client.close();
    }
}

export default getUsers;
