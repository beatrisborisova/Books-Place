import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { UserService } from 'src/app/core/services/user.service';
import Book from 'src/app/models/book';


@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  allBooks!: Book[];
  books: Array<any> = [];
  hasBooks: boolean =  false;

  constructor(private bookService: BookService, private userService: UserService) { }

  ngOnInit(): void {

    this.bookService.getAllBooks().subscribe((data: any) => {
      this.allBooks = Array.from(data);
      
      if (this.allBooks) {
      this.allBooks.forEach((book: any) => {
          if (book.owner == this.userService.uid) {
            this.books.push(book);
            this.hasBooks = true;
          }
        });        
      }
    });    
  }


}
