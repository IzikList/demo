import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-single-unit-existing',
  templateUrl: './single-unit-existing.component.html',
  styleUrls: ['./single-unit-existing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SingleUnitExistingComponent implements OnInit {

  amount = 1000 * 1000;
  irr = 15;
  le = 7;
  premiums = 30 * 1000;
  totalPremiums = 0;
  discount = 0;
  presentValueFace = 0;
  presentValueInvestor = 0;
  checkSeller = 0;
  premiumDiscount  = 4;
  constructor() { }

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

}
