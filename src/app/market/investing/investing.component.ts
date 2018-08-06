import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarketService } from '../../market.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-investing',
  templateUrl: './investing.component.html',
  styleUrls: ['./investing.component.scss']
})
export class InvestingComponent implements OnInit {
  asks: any;
  isAtMarket = true;
  data: any;
  minPolicies = 200;
  diversification = '99%';
  ammount = 1000000;
  investObj: {
    data: {
      mArray: {policiyIds: string}[],
      sum: number
    }
  };
  account: {
    available: number
  };
  userBid = 1;
  regex = '/^-?[0-9][^\.]*$/';
  constructor(private marketService: MarketService, public dialog: MatDialog) { }

  ngOnInit() {
    this.marketService.addListener(this);
    this.data = this.marketService.getAll();
    this.asks = this.marketService.getAska();
    this.investObj = this.marketService.getInvest();
    this.account = this.marketService.getAccount();
    console.log('ngOnInit ' + JSON.stringify(this.data));
    setTimeout(() => {
      this.printData();
    }, 3 * 1000);
  }

  printData() {
    console.log('printData ' + JSON.stringify(this.data));
    this.marketService.changeAsk();
    // this.marketService.calculate(10000, 2000, 12);
    // this.asks = this.data.data;
  }

  changeInvestingType() {
    this.isAtMarket = ! this.isAtMarket;
    this.marketService.calculate(this.ammount, this.ammount / this.minPolicies, this.isAtMarket ? 0 : this.userBid);
  }

  onInputChange() {
    if (this.validateAvailable()) {
      return;
    }
    console.log(this.ammount, this.ammount / this.minPolicies, 1);
    this.marketService.calculate(this.ammount, this.ammount / this.minPolicies, this.isAtMarket ? 0 : this.userBid);
    console.log(this.investObj);
  }
  validateAvailable() {
    console.log(this.ammount , this.account.available, this.ammount > this.account.available);
    return this.ammount > this.account.available;
  }
  callback() {
    this.marketService.calculate(this.ammount, this.ammount / this.minPolicies, this.isAtMarket ? 0 : this.userBid);
  }
  buy (a, b) {
    const investObjCopy = JSON.parse(JSON.stringify(this.investObj));
    let policies = [];
    for (let i = 0; i < this.investObj.data.mArray.length; i++) {
      const element = this.investObj.data.mArray[i];
      policies = policies.concat(element.policiyIds);
    }
    console.log(policies);

    this.marketService.buy(policies);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '650px',
      data: investObjCopy
    });
    this.ammount = this.account.available;
    this.marketService.calculate(this.ammount, this.ammount / this.minPolicies, this.isAtMarket ? 0 : this.userBid);
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }
  onNoClick(): void {
    // this.dialogRef.close();
  }

}

export class A {
  arr: any;
}
