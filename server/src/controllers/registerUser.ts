import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function registerUser(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    console.log(req.body);

    try {
        // Connect to database
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        // Find a specific user based on email
        const userEmail = await users.findOne({email: req.body.email});

        // If given Email doesn't exist create a new user
        if (!userEmail) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            const userData = {
                user_id: uuidv4(),
                email: req.body.email,
                password: hash,
            };
            console.log('Creating user');

            // Insert user into the database
            const createdUser = await users.insertOne(userData);

            const jwtPayload = {
                user: createdUser,
                email: req.body.email,
            };

            // Configure a jsonwebtoken
            jwt.sign(
                jwtPayload,
                process.env.SECRET as string,
                {expiresIn: 60 * 24},
                (err, token) => {
                    return res
                        .status(201)
                        .json({status: 201, user_id: userData.user_id, token: token});
                }
            );
        } else {
            console.log('Email already in use');
            return res.status(403).json('Email already in use');
        }
    } finally {
        await client.close();
    }
}

export default registerUser;
