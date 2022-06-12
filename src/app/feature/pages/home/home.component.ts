import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { UserService } from 'src/app/core/services/user.service';
import Book from 'src/app/models/book';


const urlParams = new URLSearchParams(window.location.search);
// let param = urlParams.get('search')

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  hasUser: boolean = false;
  allBooks!: Book[];
  searchResults: any = [];
  noResults: boolean = false;
  searchedValue: string = '';
  param: any = urlParams.get('search')
  toHome: boolean = true;

  searchFormGroup: FormGroup = this.formBuilder.group({
    search: new FormControl('')
  })

  constructor(private userService: UserService, private bookService: BookService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.hasUser = this.userService.isLogged;

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.urlAfterRedirects == '/') {
          this.toHome = true
          this.searchedValue = ''
        }
      }
    })

    if (this.hasUser == false) {
      localStorage.clear();
    }

    if (this.param) {
      this.onSearch(this.param);
    } else {
      this.onSearch('')
    }
    
  }
  
  onSearch(value: any) {
    
    this.toHome = false;
    if (value != '') {
      this.router.navigate([], {
        queryParams: {
          search: value.trim()
        },
        // queryParamsHandling: 'merge',
      });
      this.param = this.searchedValue.trim();
    }

    this.bookService.getAllBooks().subscribe(data => {
      data.forEach((book: any) => {
        if (value && value.trim() != '') {

          if (book.title.toLocaleLowerCase().includes(value.trim().toLocaleLowerCase())) {
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
