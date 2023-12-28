import express, {Request, Response} from 'express';
const {MongoClient} = require('mongodb');
import mongoose from 'mongoose';
import User from './models/User';
import {v4 as uuidv4} from 'uuid';
import {config} from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';

config();

/* var cors = require('cors'); */

const app = express();
const port = 5000;

app.use(
    cors({
        origin: '*',
    })
);
/* app.use(bodyParser.json()); */
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Express is up'n'running");
});

app.post('/register', async (req: Request, res: Response) => {
    const client = new MongoClient(process.env.MONGO_URL);
    console.log(req.body);

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const userEmail = await users.findOne({email: req.body.email});

        if (!userEmail) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            const userData = {
                user_id: uuidv4(),
                email: req.body.email,
                password: hash,
            };
            console.log('Creating user');

            const createdUser = await users.insertOne(userData);

            /* const token = jwt.sign(createdUser, req.body.email.toLowerCase()); */
            console.log('User created');
            return res.status(201).json({status: 201, createdUser});
        } else {
            console.log('Email already in use');
            return res.status(403).json('Email already in use');
        }
    } finally {
        await client.close();
    }
});

app.get('/users', async (req: Request, res: Response) => {
    const client = new MongoClient(process.env.MONGO_URL);

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const returnedUsers = await users.find().toArray();
        res.send('Users: ' + JSON.stringify(returnedUsers));
    } finally {
        await client.close();
    }
});

mongoose.connect(process.env.MONGO_URL ?? '').then(() => {
    app.listen(port, () => console.log('listening on port ' + port));
});
