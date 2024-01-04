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
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');
        const updatedData = {
            $push: {images: {image: image!.buffer.toString('base64')}},
        };

        const updatedUser = await users.updateOne({user_id: userId}, updatedData);

        return res.status(201).json(updatedUser);
    } finally {
        await client.close();
    }
}

const uploadMiddleware = upload.single('file');
export default (req: Request, res: Response) =>
    uploadMiddleware(req, res, () => addImage(req, res));
