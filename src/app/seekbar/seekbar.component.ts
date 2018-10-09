import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-seekbar',
  templateUrl: './seekbar.component.html',
  styleUrls: ['./seekbar.component.css']
})
export class SeekbarComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit()	{
    const elem = document.getElementById('seekbar');
    for (let i = 0; i < 10; i++) {
      const e = this.getSeekBar(i);
      elem.appendChild(e);
    }
  }

  getSeekBar(num: number) {
    const elem = document.createElement('div');
    elem.id = 'seekbarElem' + num;
    elem.style.width = '20px';
    elem.style.height = '20px';
    elem.style.backgroundColor = 'red';
    return elem;
  }


}
