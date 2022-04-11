import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hasUser: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.hasUser = this.userService.isLogged;
    
    if (this.hasUser == false) {
      localStorage.clear();
    }
    
  }

}
