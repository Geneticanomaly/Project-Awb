import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function updateUser(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    console.log('UPDATED USER BODY:', req.body.formData);
    const formData = req.body.formData;

    try {
        // Connect to the database
        await client.connect();
        const database = client.db('app-data');

        // Get the database collection users
        const users = database.collection('users');

        console.log(formData.user_id);

        // Create a set to be inserted into the database
        const updatedData = {
            $set: {
                user_id: formData.user_id,
                first_name: formData.first_name,
                last_name: formData.last_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                gender: formData.gender,
                show_gender: formData.show_gender,
                about: formData.about,
                url: formData.url,
                matches: formData.matches,
            },
        };

        // Update a user with the set data based on the provided user Id
        const updatedUser = await users.updateOne({user_id: formData.user_id}, updatedData);

        console.log('User data updated', updatedUser);

        return res.status(201).json({status: 201, updateUser: updatedUser});
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

export default updateUser;
