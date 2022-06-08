import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  showInfo: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleInfo($event: any) {
    this.showInfo = !this.showInfo
    $event.target.textContent = this.showInfo == true ? 'Hide extra info' : 'Show more info'
  }

}
