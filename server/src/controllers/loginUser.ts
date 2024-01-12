import {Request, Response} from 'express';
import {MongoClient} from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function loginUser(req: Request, res: Response) {
    const client = new MongoClient(process.env.MONGO_URL as string);
    console.log(req.body);

    try {
        // Connect to database
        await client.connect();
        const database = client.db('app-data');

        //Get the database collection users
        const users = database.collection('users');

        // Find a specific user based on email
        const user = await users.findOne({email: req.body.email});

        if (!user) {
            return res.status(403).json({message: 'Login failed, incorrect credentials'});
        }

        // Compare the given password to existing one
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) throw err;

            // If passwords match send a jsonwebtoken
            if (isMatch) {
                const jwtPayload = {
                    id: user.user_id,
                    email: user.email,
                };

                // Configure a jsonwebtoken
                jwt.sign(
                    jwtPayload,
                    process.env.SECRET as string,
                    {expiresIn: 60 * 24},
                    (err, token) => {
                        return res.status(201).json({status: 201, id: user.user_id, token: token});
                    }
                );
            } else {
                res.status(403).json({message: 'Incorrect password'});
            }
        });
    } finally {
        // Close the connection to the client afterwards
        await client.close();
    }
}

export default loginUser;
