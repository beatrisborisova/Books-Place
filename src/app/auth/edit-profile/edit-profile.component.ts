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
  selectedGender: any;

  profileFormGroup: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(/^0(8|9)(7|8|9)(\d{7})$/)
      ]
    })
  })


  onGenderToggle(event: any) {
    this.selectedGender = event.target.value;
  }

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
    let gender = this.selectedGender;
    let city = this.profileFormGroup.controls['city'].value;
    let phone: string = this.profileFormGroup.controls['phone'].value;
    let email = this.currentUser.email;
    let myBooks = this.currentUser.myBooks;



    this.profileInfo = {
      [this.userId]: {
        userId: this.userId,
        name,
        gender,
        email,
        city,
        phone,
        myBooks
      }
    }


    this.userService.editUser(this.profileInfo).subscribe(data => {
      this.toastr.success('Profile updated', 'Success')
      this.router.navigate(['/profile'])
    })

  }
}
