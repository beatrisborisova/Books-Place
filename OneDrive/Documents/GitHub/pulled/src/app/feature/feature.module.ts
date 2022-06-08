import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './books/books/book/book.component';
import { BooksComponent } from './books/books/books/books.component';
import { BookDetailsComponent } from './books/books/book-details/book-details.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CoreModule } from 'src/app/core/core.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { BarRatingModule } from 'ngx-bar-rating';
import { MyBooksComponent } from './books/my-books/my-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    BookComponent,
    BooksComponent,
    BookDetailsComponent,
    HomeComponent,
    MyBooksComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    FontAwesomeModule,
    BarRatingModule,

    BrowserAnimationsModule,
    MatProgressSpinnerModule,

  ]
})
export class FeatureModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faStar, faStarHalfAlt, farStar, faTimesCircle);
  }
}