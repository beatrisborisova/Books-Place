import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  date = new Date;
  
  constructor(public userService: UserService, private router: Router, private toastr: ToastrService) { }

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
    this.toastr.success('Logged out', 'Success')
    this.router.navigate(['/']);
  }
}
