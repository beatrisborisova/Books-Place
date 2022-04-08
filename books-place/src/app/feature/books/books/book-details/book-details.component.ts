import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/core/book.service';
import { UserService } from 'src/app/core/user.service';
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
  isOwner!: boolean;
  hasToken!: boolean;

  constructor(private bookService: BookService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private userService: UserService) { }


  ngOnInit(): void {

    this.hasToken = this.userService.isAuthenticated();

    this.bookId = this.route.snapshot.params['bookId'];
    this.bookService.getOneBook(this.bookId).subscribe(data => {
      this.currentBook = data;

      if (this.hasToken == false) {
        this.router.navigate(['/login']);
      } else {
        if (this.currentBook.owner != this.userService.uid) {
          this.isOwner = false;
        } else {
          this.isOwner = true;
        };
      }
    });
  }

  onDelete() {
    this.bookService.deleteBook(this.bookId)
      .subscribe(data => {
        this.router.navigate(['/books']);
        this.toastr.success('Book deleted', 'Success');
        return data;
      })
  }
}