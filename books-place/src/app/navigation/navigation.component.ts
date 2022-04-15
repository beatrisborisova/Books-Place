import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  date = new Date;
  
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
