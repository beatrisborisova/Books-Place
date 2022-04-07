import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/user.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  onLogin() {

    let email = this.loginFormGroup.controls['email'].value;
    let password = this.loginFormGroup.controls['password'].value;

    this.userService.login(email, password);
    
  };

}
