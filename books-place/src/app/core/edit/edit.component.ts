import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Book from 'src/app/models/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public userId: any = localStorage.getItem('token');
  bookId!: string;
  dataBindingModel!: Book;

  editFormGroup: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    resume: new FormControl('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private bookService: BookService, private toastr: ToastrService) { }

  ngOnInit(): void {

    if (!this.userId) {
      this.router.navigate(['/login']);
    }

    this.bookId = this.route.snapshot.params['bookId'];
    this.bookService.getOneBook(this.bookId).subscribe(data => {
      this.dataBindingModel = data;
    })
  }

  onEdit() {
    let title = this.editFormGroup.controls['title'].value;
    let author = this.editFormGroup.controls['author'].value;
    let year = this.editFormGroup.controls['year'].value;
    let resume = this.editFormGroup.controls['resume'].value;

    const book = {
      [this.bookId]: {
        title,
        author,
        year,
        resume,
      }
    }
    
    this.bookService.editBook(book).subscribe(data => {
      this.toastr.success('Book added', 'Success')
      this.router.navigate(['/books/details/' + this.bookId])
    });

  }
}
