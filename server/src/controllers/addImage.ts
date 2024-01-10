import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({storage: storage});

async function addImage(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    const userId = req.params.userId;
    const image = req.file;

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const users = database.collection('users');

        // Push the sent image to images array.
        const updatedData = {
            $push: {images: {image: image!.buffer.toString('base64')}},
        };

        // Update the user with a specific user ID
        const updatedUser = await users.updateOne({user_id: userId}, updatedData);

        return res.status(201).json(updatedUser);
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

const uploadMiddleware = upload.single('file');
export default (req: Request, res: Response) =>
    uploadMiddleware(req, res, () => addImage(req, res));
