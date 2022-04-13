import { Component, OnInit } from '@angular/core';
import Book from '../../../../models/book';
import { BookService } from '../../../../core/services/book.service';

import { trigger, state, style, transition, animate } from '@angular/animations'


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [
    trigger('fadeInRight', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]

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
