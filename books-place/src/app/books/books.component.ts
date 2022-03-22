import { Component, OnInit } from '@angular/core';
import Book from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  allBooks!: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {

    this.bookService.getAllBooks().subscribe(data => {      
      this.allBooks = data;
    });

  }

}
