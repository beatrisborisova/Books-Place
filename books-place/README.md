# BooksPlace

Books Place is an application for choosing books by reading their resumes. There is also book rating included to help users with their choices.

It is a project for the Angular course in Software University.

## Pages and permissions


### All users

#### Home + Search functionality

This is the main page of the Books Place application. It contains welcome message and the search functionality which can be used for books filtration by their titles.

#### Books

This page contains all the books stored in the database.

#### About

This page contains core information about the web application.

#### Register

Not registered users can sign up into the web application for having access to the whole functionality of it.

#### Log in

Registered users can sign in into the web application by giving their credentials so they can use their permissions.




### Authenticated users

#### Profile page + edit profile page functionality

Users have their own profile pages with personal information and a collection of all their books added in the web application database.

#### Create book

Users can create a book item with title, author, year of publishing, image URL and resume. So the other users can review and rate it.

#### Books details

Each book has its own details page where users can read more about the book selected.

  If a book creator

#### Edit book

Users can edit their books by changing some or all the book properties if needed.

#### Delete book

Users can delete their books if needed.

  If not a book creator

#### Rate book

Users can rate the other users’ books based on their opinion by choosing a rate from 1 to 6.



## Technology stack

* Angular 13 (version 13.2.5)
* Firebase
* HTML, CSS
* Toastr
* Angular material
* Fontawesome



## Application starting
First you must install all dependencies included in the package.json file by typing npm install (or npm i) in a terminal.

Then you must serve the angular application by typing ng serve in a terminal.

After than Books Place could be accessed on http://localhost:4200 url.


