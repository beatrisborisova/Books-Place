import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input('user') user!: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(formValue: any) {
    const [name, username, password, repass] = Object.values(formValue);
    this.userService.register({ name, username, password, repass }).subscribe(data => {
      this.user = data
      this.router.navigate(['/']);
    });;
  }

}
