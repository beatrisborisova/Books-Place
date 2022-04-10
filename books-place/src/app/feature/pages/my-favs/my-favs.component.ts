import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavouritesService } from 'src/app/core/services/favourites.service';
import { UserService } from 'src/app/core/services/user.service';
import Book from 'src/app/models/book';

@Component({
  selector: 'app-my-favs',
  templateUrl: './my-favs.component.html',
  styleUrls: ['./my-favs.component.css']
})
export class MyFavsComponent implements OnInit {

  allBooks!: Book[];
  books!: Book[];
  isFav: boolean = true;
  result!: any;

  constructor(private userService: UserService, private favsService: FavouritesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const userId = this.userService.uid

    this.favsService.getAllFavs(userId).subscribe(data => {
      this.allBooks = data

      const result = Object.entries(this.allBooks).map(([favId, v]) => Object.assign({}, { favId }, v));
      this.books = result;


    })
  }

}
