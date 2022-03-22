import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

const book = {};

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  title!: string;
  author!: string;
  year!: number;
  resume!: string;
  book = {
    "title": this.title,
    "author": this.author,
    "year": this.year,
    "resume": this.resume
  }

  constructor(private bookService: BookService) { }

  ngOnInit(): void {

      //this.bookService.createBook(book).subscribe(data => console.log(data));

  }

}
