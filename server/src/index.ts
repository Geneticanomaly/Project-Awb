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
import getMatchedUsers from './controllers/getMatchedUsers';
import addMatch from './controllers/addMatch';
import addImage from './controllers/addImage';
import getUsersChat from './controllers/getUsersChat';
import addMessage from './controllers/addMessage';
import getUserImages from './controllers/getUserImages';
import editProfileInfo from './controllers/editProfileInfo';

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

// Update a specific user
app.post('/user', updateUser);

// Get user based on a specific user ID
app.get('/user/:userId', getUser);

// Get users by their gender
app.get('/gendered-users/:gender', getUsersByGender);

// Add a match for a user
app.put('/addmatch', addMatch);

// Get all the matched users of specific user based on user ID
app.get('/matchedUsers/:userIds', getMatchedUsers);

// Add an image to the user's images array
app.post('/profile/:userId/addImage', addImage);

// Edit user information
app.put('/profile/:userId/editProfileInfo', editProfileInfo);

// Get all user images based on userId
app.get('/userImages/:userId', getUserImages);

// Get chat messages between two userIds
app.get('/chat/:userId/:loggedUserId', getUsersChat);

// Add a new message to the database
app.post('/chat/addMessage', addMessage);

// Fetch all users
app.get('/users', getUsers);

mongoose.connect(process.env.MONGO_URL ?? '').then(() => {
    app.listen(port, () => console.log('listening on port ' + port));
});
