import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inv-le',
  templateUrl: './inv-le.component.html',
  styleUrls: ['./inv-le.component.css']
})
export class InvLeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  le(diesArray, sumOfPeople) {
    const les = [];
    let dies = 0;
    for (let i = 0; diesArray.length > 0; i ++) {
      les.push(this.leForYear(diesArray, sumOfPeople));
      dies = diesArray.shift();
    }
    console.log(les);
  }
  leForYear(diesArray, sumOfPeople) {
    let sum = 0;
    let dies = 0;
    for (let index = 0; index < diesArray.length; index++) {
      const element = diesArray[index];
      sum += this.leUnit(sumOfPeople, element, index + 0.5);
      dies += element;
    }
    return sum;
  }
  leUnit(sumOfPeople, sumDies, year) {
    const mLe =  year * (sumDies / sumOfPeople);
    return mLe;
  }

}
