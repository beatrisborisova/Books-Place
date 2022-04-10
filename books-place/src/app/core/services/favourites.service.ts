import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private http: HttpClient) {
  }


  getAllFavs(userId: string): Observable<any> {
    return this.http.get<any>(`https://books-place-c5f24-default-rtdb.firebaseio.com/users/${userId}/favourites.json`)
  }

  getOneFav(bookId: string, userId: string): Observable<any> {
    return this.http.get<any>(`https://books-place-c5f24-default-rtdb.firebaseio.com/users/${userId}/favourites/${bookId}.json`);
  };

  addToFavourites(book: {}, userId: string): Observable<any> {
    return this.http.post(`https://books-place-c5f24-default-rtdb.firebaseio.com/users/${userId}/favourites.json`, book);
  }

  removeFromFavourites(favsId: string, userId: string): Observable<any> {
    return this.http.delete(`https://books-place-c5f24-default-rtdb.firebaseio.com/users/${userId}/favourites/${favsId}.json`);
  }
}
