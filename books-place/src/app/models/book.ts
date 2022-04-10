import User from "./user";

interface Book {
    bookId: string;
    title: string;
    author: string;
    year: number;
    resume: string;
    owner: User;
    favId: string;
    rating: number;
}

export default Book;