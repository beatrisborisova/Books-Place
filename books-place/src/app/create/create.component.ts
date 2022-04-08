import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../core/book.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public userId: any = localStorage.getItem('token');


  createFormGroup: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    resume: new FormControl('', [Validators.required])
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
    let owner = this.userService.uid;

    const book = {
      title,
      author,
      year,
      resume,
      owner
    };
    
    this.bookService.createBook(book).subscribe(data =>{
      this.toastr.success('Book added', 'Success')
      this.router.navigate(['/books'])
    });

  }

}
