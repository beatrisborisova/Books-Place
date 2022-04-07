import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repass: new FormControl('', [Validators.required]),
  })

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister() {
    let email = this.registerFormGroup.controls['email'].value;
    let password = this.registerFormGroup.controls['password'].value;
    let repass = this.registerFormGroup.controls['repass'].value;

    try {
      if (password == repass) {
        this.userService.register(email, password);
      } else {
        throw new Error('Passwords don\'t match')
      }
    } catch (err: any) {
      console.error(err.message);
      //TODO: Missmatched passwords indicator
    }


  }

}
