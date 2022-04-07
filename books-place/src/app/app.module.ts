import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './feature/pages/about/about.component';
import { CreateComponent } from './create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './feature/books/books.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './core/user.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    BooksModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
