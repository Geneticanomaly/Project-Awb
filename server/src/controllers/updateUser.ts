import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';

async function updateUser(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    console.log('UPDATED USER BODY:', req.body.formData);
    const formData = req.body.formData;

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        console.log(formData.user_id);

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
        const updatedUser = await users.updateOne({user_id: formData.user_id}, updatedData);

        console.log('User data updated', updatedUser);

        return res.status(201).json({status: 201, updateUser: updatedUser});
    } finally {
        await client.close();
    }
}

export default updateUser;
