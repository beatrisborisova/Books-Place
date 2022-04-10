import Book from "./book";
import Favourites from "./favourites";

interface UserProfile {
    userId: string;
    name: string;
    email: string;
    city: string;
    myBooks: Book[];
    favourites: Favourites[];
};

export default UserProfile;