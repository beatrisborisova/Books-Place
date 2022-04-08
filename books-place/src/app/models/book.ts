import User from "./user";

interface Book {
    id: string;
    title: string;
    author: string;
    year: number;
    resume: string;
    owner: User
}

export default Book;