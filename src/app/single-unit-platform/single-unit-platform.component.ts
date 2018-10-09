import { Component, OnInit } from '@angular/core';
import { InvestCycle, InvestDetails, PolicyLifeCycle, SimulatorSevice } from '../simulaor/policyLifeCycle';

@Component({
  selector: 'app-single-unit-platform',
  templateUrl: './single-unit-platform.component.html',
  styleUrls: ['./single-unit-platform.component.css']
})
export class SingleUnitPlatformComponent implements OnInit {

  constructor() { }
  amount = 1000 * 1000;
  premiums = 30 * 1000;
  years = 7;
  ownerShipOnPolicy = 12;
  investmentAmount = 2500;
  irr = 12;
  returnMoney = 0;
  maxReturnMoney = 0;

  ngOnInit() {
    const l = new SimulatorSevice();
    const ww = l.calculate(1000 * 1000, 7, 36 * 1000, 0.12);
    console.log(ww);
    this.onInputChange();
  }

  onInputChange() {
    const l = new SimulatorSevice();
    const ww = l.calculate(this.amount, this.years, this.premiums, this.irr / 100);
    console.log(ww);

    const a = ww.arr[0];
    const distance = a.premium / this.investmentAmount;
    const finalMoney = a.returnMoney / distance;
    const ownOfPolicy = (a.returnIfPass / this.amount) / distance;
    this.ownerShipOnPolicy = parseFloat((ownOfPolicy * 100).toFixed(2));
    this.returnMoney = parseInt('' + finalMoney, 0);
    this.maxReturnMoney = parseInt('' + a.returnIfPass / distance, 0);
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
