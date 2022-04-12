import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Book from 'src/app/models/book';
import { BookService } from '../services/book.service';
import { UserService } from '../../core/services/user.service';

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
    year: new FormControl('', {
      validators: [
        Validators.required, Validators.min(1000)
      ]
    }),
    resume: new FormControl('', {
      validators: [
        Validators.required, Validators.minLength(20)
      ]
    }),
    imageUrl: new FormControl('', {
      validators: [
        Validators.required, Validators.pattern(/^https?:\/\/.+((\.jpg)|(\.png)|(\.jpeg))$/)
      ]
    }),
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private bookService: BookService, private toastr: ToastrService,
    private userService: UserService) { }

  ngOnInit(): void {

    if (!this.userId) {
      this.router.navigate(['/login']);
    }

    this.bookId = this.route.snapshot.params['bookId'];
    this.bookService.getOneBook(this.bookId).subscribe((data: any) => {
      this.dataBindingModel = data;
    })
  }

  onEdit() {
    let title = this.editFormGroup.controls['title'].value;
    let author = this.editFormGroup.controls['author'].value;
    let year = this.editFormGroup.controls['year'].value;
    let resume = this.editFormGroup.controls['resume'].value;
    let imageUrl = this.editFormGroup.controls['imageUrl'].value;
    let owner = this.userService.uid;
    let rating = this.dataBindingModel.rating;

    const book = {
      [this.bookId]: {
        title,
        author,
        year,
        resume,
        imageUrl,
        rating,
        owner
      }
    }
    
    this.bookService.editBook(book).subscribe((data: any) => {
      this.toastr.success('Book added', 'Success')
      this.router.navigate(['/books/details/' + this.bookId])
    });

  }
}
