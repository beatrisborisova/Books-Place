import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/core/book.service';
import Book from '../../../../models/book';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent implements OnInit {

  @Input('book') book!: Book;

  bookId!: string;
  currentBook!: any;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.bookId = this.route.snapshot.params['bookId'];
    this.bookService.getOneBook(this.bookId).subscribe(data => {
      this.currentBook = data;
    });
  }
}