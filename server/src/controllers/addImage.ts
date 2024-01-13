import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({storage: storage});

async function addImage(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    const userId = req.params.userId;
    const file = req.file;

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const profile_images = database.collection('profile-images');

        const image = {
            user_id: userId,
            name: file?.originalname,
            encoding: file?.encoding,
            mimetype: file?.mimetype,
            buffer: file?.buffer,
        };

        const addedImage = await profile_images.insertOne(image);

        return res.status(201).json(addedImage);
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

const uploadMiddleware = upload.single('file');
export default (req: Request, res: Response) =>
    uploadMiddleware(req, res, () => addImage(req, res));
