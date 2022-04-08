import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'books-place';

  ngOnInit(): void {
    const app = initializeApp({
      apiKey: "AIzaSyAvVbCm0m8G3Wlb-LZxXsAS4EVO5I7234Q",
      authDomain: "books-place-c5f24.firebaseapp.com",
      databaseURL: "https://books-place-c5f24-default-rtdb.firebaseio.com",
      projectId: "books-place-c5f24",
      storageBucket: "books-place-c5f24.appspot.com",
      messagingSenderId: "810236930063",
      appId: "1:810236930063:web:cd05f8d99337b3ae4a1b7a",
      measurementId: "G-6R18PZJD22"
    });


  }
}
