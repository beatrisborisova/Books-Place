import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    localStorage.clear();
  }

  onLogin() {

    let email = this.loginFormGroup.controls['email'].value;
    let password = this.loginFormGroup.controls['password'].value;

    this.userService.login(email, password);

  };

}
