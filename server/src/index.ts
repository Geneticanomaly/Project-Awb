import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import {config} from 'dotenv';
import cors from 'cors';
import registerUser from './controllers/registerUser';
import getUsers from './controllers/getUsers';
import loginUser from './controllers/loginUser';
import updateUser from './controllers/updateUser';
import getUser from './controllers/getUser';
import getUsersByGender from './controllers/getUsersByGender';

/* import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import {MongoClient} from 'mongodb'; */

config();

const app = express();
const port = 5000;

app.use(
    cors({
        origin: '*',
    })
);
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Express is up'n'running");
});

// Upon success -> Create new user
app.post('/register', registerUser);

// Upon success -> Open app
app.post('/login', loginUser);

app.put('/user', updateUser);

app.get('/user/:userId', getUser);

app.get('/gendered-users/:gender', getUsersByGender);

// Fetch all users
app.get('/users', getUsers);

mongoose.connect(process.env.MONGO_URL ?? '').then(() => {
    app.listen(port, () => console.log('listening on port ' + port));
});
