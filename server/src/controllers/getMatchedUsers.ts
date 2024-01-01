import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function getMatchedUsers(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');
        const userIds = req.params.userIds.split(',');

        const pipeline = [
            {
                $match: {
                    user_id: {
                        $in: userIds,
                    },
                },
            },
        ];

        const foundUsers = await users.aggregate(pipeline).toArray();
        return res.status(201).json(foundUsers);
    } finally {
        await client.close();
    }
}

export default getMatchedUsers;
