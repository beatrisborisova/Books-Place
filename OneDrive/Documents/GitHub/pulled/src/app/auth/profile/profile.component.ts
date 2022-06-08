import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser!: any;
  user!: any;
  userId!: any;
  female: boolean = false;
  male: boolean = false;
  loading: boolean = true;
  faBook = faBook;
  faEdit = faEdit;

  constructor(private userService: UserService, private router: Router) { }


  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
    this.userId = this.currentUser.uid;

    this.userService.getUserProfile(this.userId).subscribe(data => {
      this.user = data;

      if (this.user) {
        this.loading = false;
        if (this.user.gender) {
          if (this.user.gender == 'female') {
            this.female = true;
          }
          if (this.user.gender == 'male') {
            this.male = true;
          }
        }
      } else {
        this.router.navigate(['/profile/edit'])
      };


    });

  }
}
