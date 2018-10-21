import { Component, OnInit, Inject, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarketService } from '../market.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-simulator-scenario-investing',
  templateUrl: './simulator-scenario-investing.component.html',
  styleUrls: ['./simulator-scenario-investing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SimulatorScenarioInvestingComponent implements OnInit {

  @Output() showCallBackPopUp = new EventEmitter();


  a = 1;
  asks: any;
  isAtMarket = true;
  data: any;
  minPolicies = 200;
  diversification = '99%';
  ammount = 1000000;
  investObj: {
    data: {
      mArray: { policiyIds: string }[],
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
    this.isAtMarket = !this.isAtMarket;
    this.marketService.calculate(this.ammount, this.ammount / this.minPolicies, this.isAtMarket ? 0 : this.userBid);
  }

  onInputChange() {
    if (this.validateAvailable()) {
      return;
    }
    console.log(this.ammount, this.ammount / this.minPolicies, 1);
    this.marketService.calculate(this.ammount, this.ammount / this.minPolicies, this.isAtMarket ? 0 : this.userBid);
    console.log(this.investObj);
    this.updateDiver();
  }
  updateDiver() {
    this.diversification = this.marketService.getDiver(this.minPolicies) + '%';
  }
  validateAvailable() {
    console.log(this.ammount, this.account.available, this.ammount > this.account.available);
    return this.ammount > this.account.available;
  }
  callback() {
    this.marketService.calculate(this.ammount, this.ammount / this.minPolicies, this.isAtMarket ? 0 : this.userBid);
  }

  buy() {
    if (this.a) {
      this.showCallBackPopUp.emit(this.isAtMarket ? 15.9 : this.userBid);
      return;
    }
    if (this.isAtMarket) {
      const investObjCopy = JSON.parse(JSON.stringify(this.investObj));
      let policies = [];
      for (let i = 0; i < this.investObj.data.mArray.length; i++) {
        const element = this.investObj.data.mArray[i];
        policies = policies.concat(element.policiyIds);
      }
      console.log(policies);

      this.marketService.buy(policies);

      // const dialogRef = this.dialog.open(AttmarketDialogComponent, {
      //   width: '650px',
      //   data: investObjCopy
      // });
      this.ammount = this.account.available;
      this.marketService.calculate(this.ammount, this.ammount / this.minPolicies, this.isAtMarket ? 0 : this.userBid);

    } else {
      const investObjCopy = JSON.parse(JSON.stringify(this.investObj));
      let policies = [];
      for (let i = 0; i < this.investObj.data.mArray.length; i++) {
        const element = this.investObj.data.mArray[i];
        policies = policies.concat(element.policiyIds);
      }
      console.log(policies);

      this.marketService.buy(policies);
      console.log(investObjCopy);
      alert(investObjCopy.rest);
      this.marketService.addBid(100, 16.2);
      // const dialogRef = this.dialog.open(DialogComponent, {
      //   width: '650px',
      //   data: undefined
      // });
    }
  }
}


export class A {
  arr: any;
}
