import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function editProfileInfo(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    const userId = req.params.userId;

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const users = database.collection('users');

        // Create a set to be inserted into the database
        const updatedData = {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                about: req.body.about,
            },
        };

        const updatedUser = await users.updateOne({user_id: userId}, updatedData);

        // If no user is found return
        if (!updatedUser) return res.status(403).json({status: 403, message: 'No user was found'});

        return res.status(201).json({status: 201, updatedUser});
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

export default editProfileInfo;
