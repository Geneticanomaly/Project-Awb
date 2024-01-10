import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function getUsers(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const users = database.collection('users');

        const returnedUsers = await users.find().toArray();
        res.send('Users: ' + JSON.stringify(returnedUsers));
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

export default getUsers;
