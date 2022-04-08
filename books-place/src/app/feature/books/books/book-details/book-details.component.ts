import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private bookService: BookService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {

    this.bookId = this.route.snapshot.params['bookId'];
    this.bookService.getOneBook(this.bookId).subscribe(data => {
      this.currentBook = data;
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