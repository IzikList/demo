import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-single-unit2',
  templateUrl: './single-unit2.component.html',
  styleUrls: ['./single-unit2.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SingleUnit2Component implements OnInit {

  amount = 1000 * 1000;
  irr = 15;
  le = 7;
  premiums = 30 * 1000;
  totalPremiums = 0;
  discount = 0;
  presentValueFace = 0;
  presentValueInvestor = 0;
  checkSeller = 0;
  premiumDiscount  = 7;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.onInputChange();
  }

  onInputChange() {
    this.totalPremiums = this.le * this.premiums;
    this.discount = this.irr;
    this.presentValueFace = parseInt('' + this.a(this.amount, this.irr / 100, this.le), 0);
    this.presentValueInvestor = parseInt('' + this.b(this.premiums, this.premiumDiscount / 100, this.le), 0);
    this.checkSeller = this.presentValueFace - this.presentValueInvestor;
  }
  op() {
    // const dialogRef = this.dialog.open(DialogLeComponent, {
    //     width: '650px'
    //   });
    //   dialogRef.afterClosed().subscribe(responce => {
    //     console.log(responce);
    //     const arr = [];
    //     let sumOfPeople = 0;
    //     for (let index = 0; index < responce.arr.length; index++) {
    //       const element = responce.arr[index];
    //       sumOfPeople  += parseInt(element.sumDies, 0);
    //       arr.push(element.sumDies);
    //     }
    //     this.presentValueFace = this.present(arr, sumOfPeople, this.amount);
    //   });
  }

  a(fv, r, n) {
    const x = (1 / Math.pow(1 + r, n));
    const b =  fv * x;
    return b;
  }
  b (p, r, n) {
    const x = (1 / Math.pow(1 + r, n));
    const b =  1 - x;
    const c = b / r;
    const d = p * c;
    return d;
  }

present (leArray, numOfPeople, amount) {
  console.log('present', leArray, numOfPeople, amount);
    let sum = 0;
    leArray = JSON.parse(JSON.stringify(leArray));
    let dieSum = 0;
    for (let index = 0; index < leArray.length; index++) {
      leArray[index] = leArray[index] / numOfPeople;
    }
    console.log(leArray);
    for (let index = 0; index < leArray.length; index++) {
      const element = leArray[index];
      dieSum += element;
      const a = amount * (element);
      const b = a * Math.pow(1.18, -(index + 0.5));
      sum += b;
      console.log(b);
    }
    console.log(sum);
    return sum;
  }

presentPremiums(leArray, premiums, numOfPeople) {
    leArray = JSON.parse(JSON.stringify(leArray));
    let dieSum = 0;
    for (let index = 0; index < leArray.length; index++) {
      leArray[index] = leArray[index] / numOfPeople;
    }
    let num = 0;
    console.log(leArray);
    for (let index = 0; index < leArray.length; index++) {
      const element = leArray[index];
      dieSum += element;
      const a = premiums * (1 - dieSum);
      const b = a * Math.pow(1.07, -(index + 1));
      num += b;
      console.log(b);
    }
    console.log(num);
  }

}
