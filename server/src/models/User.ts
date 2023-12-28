import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: String,
    password: String,
    first_name: String,
    last_name: String,
    dob_day: Number,
    dob_month: Number,
    dob_year: Number,
    gender: String,
    gender_interest: String,
    email: String,
    url1: String,
    about: String,
    matches: [String],
});

const User = mongoose.model('User', UserSchema);
export default User;
