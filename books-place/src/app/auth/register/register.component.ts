import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(/^\w+@{1}\w+\.\w+$/)
      ]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6)
      ]
    }),
    repass: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6)
      ]
    }),
  })

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    localStorage.clear();
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
      this.toastr.error('Passwords don\'t match', 'Error')
      this.registerFormGroup.get('password')?.reset();
      this.registerFormGroup.get('repass')?.reset();
    }

  }

}

