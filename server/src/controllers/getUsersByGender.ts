import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function getUsersByGender(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    const gender = req.params.gender;

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');
        console.log('HELLO', gender);
        const returnedUsers = await users.find({gender: gender}).toArray();
        return res.status(201).json(returnedUsers);
    } finally {
        await client.close();
    }
}

export default getUsersByGender;
