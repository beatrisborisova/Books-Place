import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './books/book/book.component';
import { BooksComponent } from './books/books/books.component';
import { HomeComponent } from '../pages/home/home.component';
import { CoreModule } from 'src/app/core/core.module';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { AppRoutingModule } from 'src/app/app-routing.module';


import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { BarRatingModule } from 'ngx-bar-rating';
import { MyBooksComponent } from './my-books/my-books.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookComponent,
    BooksComponent,
    BookDetailsComponent,
    HomeComponent,
    MyBooksComponent,

  ],
  imports: [
    CommonModule,
    CoreModule,
    AppRoutingModule,
    FormsModule,
    
    FontAwesomeModule,
    BarRatingModule
  ]
})
export class BooksModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faStar, faStarHalfAlt, farStar, faTimesCircle);
  }
 }

