import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/core/services/book.service';
import { FavouritesService } from 'src/app/core/services/favourites.service';
import { UserService } from '../../../../core/services/user.service';
import Book from '../../../../models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})


export class BookDetailsComponent implements OnInit {
  //TODO: Eventually should be removed - faRate = 4;
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

  hasRated!: any;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private favsService: FavouritesService) { }


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

    this.bookService.getOneBook(this.bookId).subscribe(data => {
      this.allRates = Number(data.rating)
    })

    this.bookService.getRaiters().subscribe(data => {
      let allRaiting = Object.entries(data).map(([rateId, v]) => Object.assign({}, { rateId }, v));

      allRaiting.forEach(el => {
        if (el.userId == this.userService.uid) {
          if (el.bookId == this.bookId) {
            this.hasRated = true;
          }
        }
      })

    })

  }


  onRate() {

    this.currentBook.rating += this.rate;
    this.allRates +=  this.rate;
    this.bookId = this.route.snapshot.params['bookId'];

    const book = {
      [this.bookId]: this.currentBook
    }

    const rainterAndBook = {
      bookId: this.bookId,
      userId: this.userService.uid
    }

    this.bookService.editBook(book).subscribe(data => {
      this.isRated = true;
      this.bookService.raiters(rainterAndBook).subscribe(data => {
        
      })
    })

  }


  onDelete() {
    this.bookService.deleteBook(this.bookId)
      .subscribe(data => {
        this.router.navigate(['/books']);
        this.toastr.success('Book deleted', 'Success');
        return data;
      })

    this.removeFromFavourites();
  }

  saveToFavourites() {
    const userId = this.userService.uid;

    let title = this.currentBook.title;
    let author = this.currentBook.author;
    let year = this.currentBook.year;
    let resume = this.currentBook.resume;
    let owner = this.currentBook.owner;

    const book = {
      title,
      author,
      year,
      resume,
      owner,
      bookId: this.bookId,
    }
    this.favsService.addToFavourites(book, userId).subscribe(data => {
      this.favBookId = data;
    })
    this.isFav = true;

  }

  //TODO: To be removet eventually
  allFavs!: any;
  removeFromFavourites() {
    const userId = this.userService.uid;

    this.favsService.getOneFav(this.bookId, userId).subscribe(data => {
      console.log(data);

    })

    this.favsService.removeFromFavourites(this.bookId, userId).subscribe(data => {
      this.isFav = false;
      this.router.navigate(['/books/details/' + this.bookId]);
      this.toastr.success('Removed from favourites', 'Success');
    })

    /*
    this.favsService.getAllFavs(userId).subscribe(data => {
      this.favsId = data

      const values = Object.values(this.favsId)
      console.log('key', values);

      this.favsService.removeFromFavourites(values[0], userId).subscribe(data => {
        this.isFav = false;
        this.router.navigate(['/books/details/' + this.bookId]);
        this.toastr.success('Removed from favourites', 'Success');
      })
    })
    this.isFav = false;
*/
  }

}