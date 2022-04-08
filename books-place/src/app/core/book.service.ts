import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Books from '../models/books';
import { UserService } from './user.service';


const BASE_URL = 'https://books-place-c5f24-default-rtdb.firebaseio.com/books';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getAllBooks(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}.json`)
      .pipe(
        map((res: Response) => {
          if (res) {
            return Object.entries(res).map(([id, v]) => Object.assign({}, { id }, v));
          } else {
            return;
          }
        })
      )
  };

  getOneBook(bookId: string): Observable<any> {
    return this.http.get<Books>(`${BASE_URL}${bookId}.json`);
  };

  createBook(book: {}): Observable<any> {
    return this.http.post(`${BASE_URL}.json`, book);
  };

  editBook(book: {}): Observable<any> {
    return this.http.patch(`${BASE_URL}.json`, book);
  };

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${BASE_URL}${bookId}.json`);
  };
}
