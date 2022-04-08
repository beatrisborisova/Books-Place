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
      authDomain: "books-place-c5f24.firebaseapp.com"
    });


  }
}
