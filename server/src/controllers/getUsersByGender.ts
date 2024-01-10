import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function getUsersByGender(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    const gender = req.params.gender;

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const users = database.collection('users');

        // Get users based on a specific gender
        const returnedUsers = await users.find({gender: gender}).toArray();

        return res.status(201).json(returnedUsers);
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

export default getUsersByGender;
