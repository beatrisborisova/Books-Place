import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Books from '../models/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.http.get<Books>('http://localhost:3000/data/books')
  };

  getOneBook(bookId: string): Observable<any> {
    return this.http.get<Books>('http://localhost:3000/data/books/' + bookId);
  };

  createBook(book: {}): Observable<any> {
    return this.http.post('http://localhost:3000/data/books', book);
  };

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete('http://localhost:3000/data/books' + bookId);
  }
}
