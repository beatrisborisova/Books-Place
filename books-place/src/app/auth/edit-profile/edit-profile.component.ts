import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) { }

  userId!: any;
  dataBindingModel!: any;


  profileFormGroup: FormGroup = this.formBuilder.group({
    name: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl('', [Validators.minLength(10)])
  })

  ngOnInit(): void {

    this.userId = this.userService.uid;
    this.userService.getUserProfile(this.userId).subscribe(data => {
      this.dataBindingModel = data;
    })
  }

  onEditProfileInfo() {

    this.userId = this.userService.uid;

    let name = this.profileFormGroup.controls['name'].value;
    let city = this.profileFormGroup.controls['city'].value;
    let phone = this.profileFormGroup.controls['phone'].value;

    const profileInfo = {
      [this.userId]: {
        name,
        city,
        phone
      }
    }


    this.userService.editUser(profileInfo).subscribe(data => {
      this.toastr.success('Profile updated', 'Success')
      this.router.navigate(['/profile'])
    })

  }
}
