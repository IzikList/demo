import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css', './bar.component.scss']
})
export class BarComponent implements OnInit {

  opened;
  collapsed = true;
  investorItems = [
    {name: 'My portfolio',  style: ''},
    {name: 'Marketplace',   style: ''},
    {name: 'Returns',       style: ''},
    {name: 'How it works',  style: ''},
    {name: 'Get started',   style: ''}
  ];
  policyItems = [
    {name: 'My policy',  style: ''},
    {name: 'Customer support',   style: ''},
    {name: 'How it works',       style: ''},
    {name: 'Get started',   style: ''}
  ];

  generalItems = [
    {name: 'About',  style: ''},
    {name: 'L.S market overview',   style: ''},
    {name: 'FAQ',       style: ''},
    {name: 'Code of ethics',  style: ''},
    {name: 'Press',   style: ''},
    {name: 'Contact us',   style: ''},
    {name: 'Take a tour',   style: ''}
  ];
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
    document.getElementById('header').classList.toggle('header');
    document.getElementById('header').classList.toggle('barOpened');
  }

}
