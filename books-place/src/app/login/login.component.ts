import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input('user') user!: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(formValue: any) {
    const [username, password] = Object.values(formValue);

    console.log(this.user);
    

    this.userService.login({ username, password }).subscribe(data => {
      this.user = data;
      console.log('here');
      console.log(this.user);
      
      
      this.router.navigate(['/']);
    });
  };

}
