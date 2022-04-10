import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FavouritesService } from 'src/app/core/services/favourites.service';
import { UserService } from 'src/app/core/services/user.service';
import Book from 'src/app/models/book';

@Component({
  selector: 'app-fav-item',
  templateUrl: './fav-item.component.html',
  styleUrls: ['./fav-item.component.css']
})
export class FavItemComponent implements OnInit {

  @Input('book') book!: Book;
  favId!: string;
  currentLang!: any;

  constructor(private userService: UserService, private favService: FavouritesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {


    let userId = this.userService.uid;
    this.favId= this.route.snapshot.params['favId'];

   this.favService.getOneFav(this.favId, userId).subscribe(data => {
     this.book = data;
   })

  }

  removeFromFavourites() {
    let userId = this.userService.uid;
    this.favId= this.route.snapshot.params['favId'];

    console.log('userId', userId);
    console.log('this.favId', this.favId);
    

    this.favService.removeFromFavourites(this.favId, userId).subscribe(data => {
      console.log(data);
    })
  }


}
