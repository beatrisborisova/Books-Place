import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './books/book/book.component';
import { BooksComponent } from './books/books/books.component';
import { HomeComponent } from '../pages/home/home.component';
import { CoreModule } from 'src/app/core/core.module';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [
    BookComponent,
    BooksComponent,
    BookDetailsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AppRoutingModule
  ],
  exports: [
    BookComponent,
    BooksComponent,
    BookDetailsComponent,
    HomeComponent
  ]
})
export class BooksModule { }
