import Book from "./book";

interface UserProfile {
    userId: string;
    name: string;
    email: string;
    city: string;
    myBooks: Book[];
};

export default UserProfile;