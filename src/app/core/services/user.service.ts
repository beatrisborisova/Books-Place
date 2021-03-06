import { Injectable } from '@angular/core';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, 
  UserProfile,
} from 'firebase/auth';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


let userdata!: any;
const USERS_URL = 'https://books-place-c5f24-default-rtdb.firebaseio.com/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: any;
  isLogged: boolean = false;
  token!: any;
  uid!: any;
  returnUrl!: string;


  constructor(private toastr: ToastrService, private router: Router, private http: HttpClient,
    private route: ActivatedRoute) { }

  register(email: string, password: string) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(data => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            userdata = user;
            this.token = userdata.accessToken;
            localStorage.setItem('token', this.token);
            this.uid = userdata.uid;
          }
        })

        this.router.navigate(['/profile']);
        this.toastr.success('Registered', 'Success');
        this.isLogged = true;
      })
      .catch(error => {
        this.toastr.error('Unsuccessful registration', 'Error')
      });
  }

  login(email: string, password: string) {
    const auth = getAuth();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    signInWithEmailAndPassword(auth, email, password)
      .then(data => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            userdata = user;
            this.token = userdata.accessToken;
            localStorage.setItem('token', this.token);
            this.uid = userdata.uid;
          }
        })
        this.router.navigateByUrl(this.returnUrl)

        this.toastr.success('Logged In', 'Success');
        this.isLogged = true;

      })
      .catch(error => {
        this.toastr.error('Unsuccessful login', 'Error')
      })
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.token = null;       
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

  getUser() {
    const auth = getAuth()
    return auth.currentUser;
  }

  editUser(user: UserProfile): Observable<UserProfile> {
    return this.http.patch<UserProfile>(`${USERS_URL}.json`, user);
  };

  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${USERS_URL}${userId}.json`)
  };


}
