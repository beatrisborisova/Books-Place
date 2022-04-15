import User from "./user";

interface Book {
    bookId: string;
    title: string;
    author: string;
    year: number;
    resume: string;
    imageUrl: string;
    owner: User;
    rating: number;
}

export default Book;