import { Component, OnInit } from '@angular/core';
import { MENU_ITEM } from './side-bar-menu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  items = MENU_ITEM;
  constructor() { }

  ngOnInit() {
  }

}
