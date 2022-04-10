import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) { }

  userId!: any;
  dataBindingModel!: any;
  currentUser!: any;
  profileInfo!: UserProfile;


  profileFormGroup: FormGroup = this.formBuilder.group({
    name: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl('', [Validators.minLength(10)])
  })

  ngOnInit(): void {

    this.currentUser = this.userService.getUser();
    this.userId = this.currentUser.uid;

    this.userService.getUserProfile(this.userId).subscribe(data => {
      this.dataBindingModel = data;
    })
  }

  onEditProfileInfo() {

    this.userId = this.userService.uid;

    let name = this.profileFormGroup.controls['name'].value;
    let city = this.profileFormGroup.controls['city'].value;
    let phone = this.profileFormGroup.controls['phone'].value;
    let email = this.currentUser.email;
    let favourites = this.currentUser.favourites;
    let myBooks = this.currentUser.myBooks;
    
    console.log('favourites', favourites);
    

    this.profileInfo = {
      [this.userId]: {
        userId: this.userId,
        name,
        email,
        city,
        phone,
        myBooks,
        favourites
      }
    }


    this.userService.editUser(this.profileInfo).subscribe(data => {
      this.toastr.success('Profile updated', 'Success')
      this.router.navigate(['/profile'])
    })

  }
}
