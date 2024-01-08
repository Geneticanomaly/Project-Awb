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
    matches: [string];
    show_gender: string;
    url: string;
    images?: [string];
};

export type UserMessage = {
    from_userId: string;
    to_userId: string;
    message: string;
    timestamp: string;
};
