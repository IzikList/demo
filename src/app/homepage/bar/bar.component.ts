import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css', './bar.component.scss']
})
export class BarComponent implements OnInit {

  opened;
  collapsed = true;
  constructor() { }

  ngOnInit() {
  }

  showHideMenu () {
    document.getElementById('phoneOpenMenu').classList.toggle('show');
    document.getElementById('header').classList.toggle('show');
  }
  openSubMenu(a) {
    if (this.opened && this.opened !== a.target) {
      this.opened.getElementsByClassName('submenu1')[0].classList.remove('opened');
    }
    this.opened = a.target;
    a.target.getElementsByClassName('submenu1')[0].classList.toggle('opened');
  }

  toggle() {
    document.getElementById('hamburgerButton').classList.toggle('is-active');
    // Look ma, [very little] Javascript!
    document.querySelector('.section.collapsible').classList.toggle('collapsed');  
  }


}
