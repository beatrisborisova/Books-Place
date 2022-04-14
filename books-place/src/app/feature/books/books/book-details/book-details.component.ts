import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/core/services/book.service';
import { UserService } from '../../../../core/services/user.service';
import Book from '../../../../models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})


export class BookDetailsComponent implements OnInit {
  fontAwesomeRate = 3.5;
  isRated!: boolean;
  allRates!: number;

  @Input('book') book!: Book;
  @Input('rate') rate!: number;


  bookId!: string;
  currentBook!: any;
  isOwner!: boolean;
  hasToken!: boolean;
  favsId!: string;
  favBookId!: string;
  isFav!: boolean;

  shorted!: string;
  isExpanded: boolean = false;
  resume!: string;


  hasRated!: any;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService) { }


  ngOnInit(): void {

    this.hasToken = !!localStorage.getItem('token');
    this.bookId = this.route.snapshot.params['bookId'];

    this.bookService.getOneBook(this.bookId).subscribe((data: any) => {
      this.currentBook = data;
      this.shorted = this.currentBook.resume
      this.shorted = this.shorted.slice(0, 100);

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

    this.bookService.getOneBook(this.bookId).subscribe((data: any) => {
      this.allRates = Number(data.rating)
    })


    this.bookService.getRaters().subscribe((data: any) => {

      let allRating = [data];
      if (data) {

        allRating.forEach(el => {
          let current: any = Object.values(el);
          current.forEach((c: any) => {
            if (c.userId == this.userService.uid) {
              if (c.bookId == this.bookId) {
                this.hasRated = true;
                console.log('hasRated', this.hasRated);
                
              }
            }
          })
        })
      }
    })
  }


  onRate() {

    this.currentBook.rating += this.rate;
    this.allRates += this.rate;
    this.bookId = this.route.snapshot.params['bookId'];

    const book = {
      [this.bookId]: this.currentBook
    }

    const rainterAndBook = {
      bookId: this.bookId,
      userId: this.userService.uid
    }

    this.bookService.editBook(book).subscribe((data: any) => {
      this.isRated = true;
      this.bookService.raiters(rainterAndBook).subscribe();
    })

  }


  onDelete() {
    this.bookService.deleteBook(this.bookId)
      .subscribe((data: any) => {
        this.router.navigate(['/books']);
        this.toastr.success('Book deleted', 'Success');
        return data;
      })
  }

  onToggleExpand($event: any) {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded == true) {
      this.resume = this.currentBook.resume;
      $event.target.textContent = 'Hide full resume'
    } else {
      this.resume = this.shorted;
      $event.target.textContent = 'Show full resume'
    }
  }
}