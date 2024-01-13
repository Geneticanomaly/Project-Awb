export type User = {
    _id: string;
    user_id: string;
    email: string;
    password: string;
    about: string;
    dob_day: string;
    dob_month: string;
    dob_year: string;
    first_name: string;
    gender: string;
    last_name: string;
    matches: {user_id: string}[]; // An array of objects that have a user_id attribute
    show_gender: string;
    url: ProfileImage;
    registration_date: string;
};

export type UserMessage = {
    from_userId: string;
    to_userId: string;
    message: string;
    timestamp: string;
};

export type ProfileImage = {
    user_id: string;
    name: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
};
