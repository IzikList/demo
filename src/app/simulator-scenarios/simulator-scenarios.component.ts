import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Item } from '../simulaor/item';
import { PolicyLifeCycle, InvestCycle, InvestDetails, CalculateObject, SimulatorSevice } from '../simulaor/policyLifeCycle';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SeekbarComponent } from '../seekbar/seekbar.component';



export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const staticArr = [];
@Component({
  selector: 'app-simulaor-scenario',
  templateUrl: './simulator-scenarios.component.html',
  styleUrls: ['./simulator-scenarios.component.css'],  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class SimulatorScenariosComponent implements OnInit {
  displayedColumns: string[] = ['a', 'b', 'c', 'd'];
  dataSource: InvestCycle[];

  displayedColumnsd = ['position', 'name', 'weight', 'returnPass'];
  dataSourced = new ExampleDataSource();

  expandedElement: any;
  policyLifeCycle: PolicyLifeCycle;
  test = [{key: 'a', v: 'aaa'}, {key: 'b', v: 'bbb'}];
  @ViewChild('marketData') child;

  item: Item;
  minPolicies: any;
  amount = 1000000;
  percent =  0.12;
  years =  7;
  premiums =  36000;
  arr: InvestCycle[] = [];
  ownerMoney = 0;
  t = [];
  pcs = [0.06, 0.08, 0.10, 0.12, 0.15, 0.18, 0.21];
  choosenPercent = [];
  chhosenIndex = 0;
  constructor(private changeDetectorRefs: ChangeDetectorRef) {
    this.item = new Item();
  }
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  ngOnInit() {
  }

  p() {
    console.log(JSON.stringify(this.test));
  }
  calculateShares(years: number, sharesAtEnd: number) {

  }

  getPercentByYear(years, investMoney, returnMoney) {
    const returnPercent = ((returnMoney / investMoney) - 1) * 100;
    console.log('years', years);
    console.log('1 / n ', (1 / years));
    console.log('pow ("+returnPercent+" ^ 1/n)', Math.pow(returnPercent, (1 / years)));
    console.log((1 + (returnPercent / 100)));
    const pcPerYear = Math.pow((1 + (returnPercent / 100)), 1 / years) - 1;
    console.log('pcPerYear', pcPerYear);
    return pcPerYear * 100;
  }

  getPercentForPercent(years, percent) {
    return Math.pow(1 + percent, years);
  }

  getMoneyForPercent(years, percent, invest) {
    return parseInt('' + (invest * this.getPercentForPercent(years, percent)));
  }

  getSharesForOwner(years, amount, premium, startPercent) {
    const allInvestorMoney = this.getMoneyForAllInvestors(years, amount, startPercent, premium);
    const sharesForInvestors = allInvestorMoney;
    const shareForOwner = this.amount - sharesForInvestors;
    return shareForOwner;
  }

  getMoneyForAllInvestors(years, amount, percent, premiums) {
    let investorsMoney = 0;
    const arr: InvestCycle[] = [];
    for (let i = years; i > 0; i -- ) {
      const money = this.getMoneyForPercent(i, percent, premiums);
      investorsMoney += money;
      const item = new InvestCycle();
      item.amount = amount;
      item.years = i;
      item.premium = premiums;
      item.returnMoney = money;
      item.sharePrice = parseFloat((premiums / item.returnMoney).toFixed(2));
      item.anotherInvestorsMoney = investorsMoney - money;
      // arr.push(item);
    }
    this.arr = arr;
    this.dataSource = arr;
    return investorsMoney;
  }

  calculateForYear(amount, years, sharesForOwner, sharesOtherInvestors, moneyOtherInvestor, premiumsPrice, percent) {
    const money = this.getMoneyForPercent(years, percent, premiumsPrice);
    const invest = new InvestCycle();
    invest.amount = amount;
    invest.years = years;
    invest.returnMoney = money;
    invest.premium = premiumsPrice;
    invest.returnPerCent = percent;
    invest.anotherInvestorsMoney = moneyOtherInvestor;
    invest.anotherInvestorsShares = sharesOtherInvestors;

    // calcualte how many shares for this invest if all rest premiums will sell this price
    let newMoneyToReturn = money;
    for (let i = years - 1; i >= 1; i -- ) {
      newMoneyToReturn += this.getMoneyForPercent(i, percent, premiumsPrice);
    }
    const allShares = sharesForOwner + sharesOtherInvestors;
    const sharePriceWithNewMoney = ( amount - newMoneyToReturn ) / allShares; // existsing shares prices

    invest.numOfShares = money / sharePriceWithNewMoney;
    invest.sharePrice =  parseFloat((premiumsPrice / invest.numOfShares).toFixed(2));
    return invest;
  }

  onInputChange() {
  }
  simulate (e) {
    this.percent = e / 100;
    this.calculate();
  }

  calculate() {
    this.years = parseInt(parseFloat(this.child.getVal('AVG. LE')).toFixed(), 0);
    const service = new SimulatorSevice();
    const wc = 0.21;
    const arrToTest = [];
    for (let m = 0; m < this.years - 1; m++) {
      arrToTest.push(wc);
    }
    arrToTest.push(this.percent);
    const b: CalculateObject = service.calculate2(this.amount, this.premiums, arrToTest);
    // const b: CalculateObject = service.calculate2(
      // this.amount, this.premiums, [this.percent, this.percent, this.percent, this.percent, this.percent, this.percent, this.percent]);
    this.ownerMoney = b.ownerMoney;
    staticArr.length = 0;
    this.arr = b.arr;
    staticArr.push.apply(staticArr, this.arr);

    const tableObj = [];
    const pcs = this.getChhosenPcs(this.percent);
    console.log('pcs ' + JSON.stringify(pcs));
    this.choosenPercent = [];
    for (let x = 0; x < pcs.length; x++) {
      const e = pcs[x];
      if (e === this.percent) {
        this.choosenPercent.push({num: e, highlight: true});
        this.chhosenIndex = x;
      } else {
        this.choosenPercent.push({num: e, highlight: false});
      }
    }
    for (let i = 0; i < pcs.length; i ++) {
      const element = pcs[i];
      const obj = [];
      for (let i2 = this.years; i2 > 0; i2 --) {
        const arr = [];

        // make array premiums for invest
        for (let i3 = this.years; i3 > 0; i3 --) {
          if ( i3 <= i2 ) {
            arr.push(this.percent);
          } else {
            arr.push(element);
          }
        }
        if ( ! tableObj[i2] ) {
            tableObj[i2] = [];
        }
        tableObj[i2][i] = parseFloat((service.calculate2(this.amount, this.premiums, arr).arr[0].irr).toFixed(2));
        console.log('ttt', JSON.stringify(arr) , element, tableObj[i2][i]);
        // obj[i2] = service.calculate2(this.amount, this.premiums, pcs).arr[0].;
      }
    }
    tableObj.shift();
    tableObj.pop();
    console.log(tableObj);
    this.t = [];
    for (let index = 1; index <= tableObj.length; index++) {
      const e = JSON.stringify(tableObj[index - 1]);
      console.log(e);
      const element = JSON.parse(e);
      element.unshift('IRR Year ' + index + ' (%)');
      this.t.push(element);
    }

    this.dataSourced = new ExampleDataSource();
    this.changeDetectorRefs.detectChanges();
  }

  getChhosenPcs(pc): Array<number> {
    const arr = JSON.parse(JSON.stringify(this.pcs));
    if (pc < arr[0]) {
      arr.shift();
      arr.unshift(pc);
      return arr;
    } else if (pc > arr[arr.length - 1]) {
      arr.pop();
      arr.push(pc);
      return arr;
    }

    for (let i = 0; i < arr.length - 1; i++) {
      const element = arr[i];
      if (pc > element && pc < arr[i + 1] ) {
        const d1 = pc - element;
        const d2 = arr[i + 1] - pc;
        if (d1 > d2) {
          arr[i + 1] = pc;
        } else {
          arr[i] = pc;
        }
        return arr;
      }
    }
    return arr;
  }

  getPercent(a) {
    return parseFloat((a * 100).toFixed(2));
  }
}
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    const rows = [];
    staticArr.forEach(element => rows.push(element, { detailRow: true, element }));
    console.log(rows);
    return of(rows);
  }

  disconnect() { }
}
