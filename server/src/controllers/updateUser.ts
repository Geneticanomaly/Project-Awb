import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({storage: storage});

async function updateUser(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    const formData = req.body;
    const file = req.file;

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const users = database.collection('users');

        const image = {
            name: file?.originalname,
            encoding: file?.encoding,
            mimetype: file?.mimetype,
            buffer: file?.buffer,
        };

        // Create a set to be inserted into the database
        const updatedData = {
            $set: {
                user_id: req.body.user_id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                dob_day: req.body.dob_day,
                dob_month: req.body.dob_month,
                dob_year: req.body.dob_year,
                gender: req.body.gender,
                show_gender: req.body.show_gender,
                about: req.body.about,
                url: image,
                matches: [],
            },
        };

        // Update a user with the set data based on the provided user Id
        const updatedUser = await users.updateOne({user_id: formData.user_id}, updatedData);

        return res.status(201).json({status: 201, updateUser: updatedUser});
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

const uploadMiddleware = upload.single('file');
export default (req: Request, res: Response) =>
    uploadMiddleware(req, res, () => updateUser(req, res));
