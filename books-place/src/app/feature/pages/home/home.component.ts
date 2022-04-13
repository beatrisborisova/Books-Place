import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { UserService } from 'src/app/core/services/user.service';
import Book from 'src/app/models/book';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  hasUser: boolean = false;
  allBooks!: Book[];
  searchedValue: string = '';
  searchResults: any = [];
  noResults: boolean = false;

  constructor(private userService: UserService, private bookService: BookService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.hasUser = this.userService.isLogged;

    if (this.hasUser == false) {
      localStorage.clear();
    }

  }

  onSearch() {
    this.bookService.getAllBooks().subscribe(data => {
      data.forEach((book: any) => {
        if (this.searchedValue.trim()) {
          if (book.title.toLocaleLowerCase().includes(this.searchedValue.toLocaleLowerCase())) {
            this.searchResults.push(book);
          }
        }
      })

      if (this.searchResults.length == 0 && this.searchedValue != '') {
        this.noResults = true;
      } else {
        this.noResults = false;
      }

    })
    this.searchResults = [];

  }






}
