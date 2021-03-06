import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  public userId: any = localStorage.getItem('token');
  public maxYear: number = new Date().getFullYear();

  createFormGroup: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    year: new FormControl('', {
      validators: [
        Validators.required, Validators.min(1000),
        Validators.required, Validators.max(this.maxYear)
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
  })

  constructor(private bookService: BookService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private userService: UserService) { }

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
    let imageUrl = this.createFormGroup.controls['imageUrl'].value;
    let owner = this.userService.uid;
    let rating = 0;

    const book = {
      title,
      author,
      year,
      resume,
      rating,
      imageUrl,
      owner,
    };


    this.bookService.createBook(book).subscribe((data: any) => {
      this.toastr.success('Book added', 'Success')
      this.router.navigate(['/books'])
    });

  }

}
