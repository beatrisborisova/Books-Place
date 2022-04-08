import { Injectable } from '@angular/core';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

let userdata!: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: any;
  isLogged: boolean = false;
  token!: any;
  UID!: any;

  constructor(private toastr: ToastrService, private router: Router) { }

  register(email: string, password: string) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(data => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            userdata = user;
            this.token = userdata.accessToken;
            localStorage.setItem('token', this.token);
            this.UID = userdata.uid;
          }
        })
        this.router.navigate(['/']);
        this.toastr.success('Registered', 'Success');
      })
      .catch(error => {
        this.toastr.error(error.message, 'Warning');
      });
  }

  login(email: string, password: string) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(data => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            userdata = user;
            this.token = userdata.accessToken;
            localStorage.setItem('token', this.token);
            this.UID = userdata.uid;
          }
        })
        this.router.navigate(['/']);
        this.toastr.success('Logged In', 'Success');
      })
      .catch(error => {
        this.toastr.error(error.message, 'Waring');
      })
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.token = null;
        this.router.navigate(['/']);
        this.toastr.success('Logged out', 'Success');
        localStorage.removeItem('token');
      })

  }

  getToken() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userdata = user;
        this.token = userdata.accessToken;
      }
    })

    return this.token;
  }


  isAuthenticated(): boolean {
    return this.token != null;
  }
}
