import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Books from '../../models/books';


const BASE_URL = 'https://books-place-c5f24-default-rtdb.firebaseio.com/books/';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}.json`)
      .pipe(
        map((res: Response) => {
          if (res) {
            return Object.entries(res).map(([bookId, v]) => Object.assign({}, { bookId }, v));
          } else {
            return;
          }
        })
      )
  };

  getOneBook(bookId: string): Observable<any> {
    return this.http.get<Books>(`${BASE_URL}${bookId}.json`);
  };

  getMyBooks(): Observable<Books> {
    return this.http.get<Books>(`${BASE_URL}.json`);
  };

  getRaters(): Observable<Books> {
    return this.http.get<Books>(`https://books-place-c5f24-default-rtdb.firebaseio.com/raters.json`)
  };

  raiters(rait: {}): Observable<Books> {
    return this.http.post<Books>(`https://books-place-c5f24-default-rtdb.firebaseio.com/raters.json`, rait)
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

  //rateBook()

}
