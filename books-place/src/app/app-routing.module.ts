import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './feature/pages/about/about.component';
import { BooksComponent } from './feature/books/books/books/books.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './feature/pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { BookDetailsComponent } from './feature/books/books/book-details/book-details.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './feature/pages/not-found/not-found.component';
import { EditComponent } from './core/edit/edit.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { MyBooksComponent } from './feature/books/my-books/my-books.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'books', children: [
      { path: '', pathMatch: 'full', component: BooksComponent },
      { path: 'details/:bookId', component: BookDetailsComponent, canActivate: [AuthGuard] },
      { path: 'edit/:bookId', component: EditComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/books', component: MyBooksComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
