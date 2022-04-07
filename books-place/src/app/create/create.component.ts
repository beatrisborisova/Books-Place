import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../core/book.service';

const book = {};


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public userId: any = sessionStorage.getItem('userId');


  createFormGroup: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    resume: new FormControl('', [Validators.required])
  })

  constructor(private bookService: BookService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if (!this.userId) {
      this.router.navigate(['/login']);
    }

  }

  onCreate() {
    let title = this.createFormGroup.controls['title'].value;
    let author = this.createFormGroup.controls['author'].value;
    let year = this.createFormGroup.controls['year'].value;
    let resume = this.createFormGroup.controls['resume'].value;
    let owner = sessionStorage.getItem('userId');

    const book = {
      title,
      author,
      year,
      resume,
      owner
    }

    console.log(this.bookService.createBook(book));
    
    this.bookService.createBook(book).subscribe(data => console.log('data', data));

  }

}
