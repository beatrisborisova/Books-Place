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
    return this.http.get<Books>('http://localhost:3000/books')
  };

  getOneBook() {

  };

  createBook(book: {}): Observable<any> {
    return this.http.post<Books>('http://localhost:3000/create', book);
  }
}
