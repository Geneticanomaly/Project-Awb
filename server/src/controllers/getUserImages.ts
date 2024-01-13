import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function getUserImages(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    const userId = req.params.userId;

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const profile_images = database.collection('profile-images');

        const images = await profile_images.find({user_id: userId}).toArray();

        // Check if any images were found
        if (!images) {
            res.status(403).json({status: '403', message: 'User has no images'});
        }

        return res.status(201).json(images);
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

export default getUserImages;
