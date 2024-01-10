import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function getMatchedUsers(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const users = database.collection('users');
        const userIds = req.params.userIds.split(',');

        // https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/
        // Create an aggregation pipeline
        const pipeline = [
            {
                $match: {
                    user_id: {
                        $in: userIds, // Use the $in operator to match values in the userIds array
                    },
                },
            },
        ];

        // Execute the aggregation pipeline on the 'users' collection and convert the result to an array
        const foundUsers = await users.aggregate(pipeline).toArray();

        return res.status(201).json(foundUsers);
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

export default getMatchedUsers;
