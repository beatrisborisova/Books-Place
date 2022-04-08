import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser!: any;
  user!: any;
  userId!: any;

  constructor(private userService: UserService) { }

  
  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
    this.userId = this.currentUser.uid;

    this.user = this.userService.getUserProfile(this.userId).subscribe(data => {
      this.user = data;
    });

  }



}
