import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function getUser(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const users = database.collection('users');

        // Get a specific user based on user ID
        const user = await users.findOne({user_id: req.params.userId});

        if (!user) {
            return res.status(403).json('No such user found!');
        }

        return res.status(201).json(user);
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

export default getUser;
