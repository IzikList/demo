import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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


  item: Item;
  minPolicies: any;
  amount = 1000000;
  percent =  0.12;
  years =  7;
  premiums =  36000;
  arr: InvestCycle[] = [];
  ownerMoney = 0;
  constructor(private changeDetectorRefs: ChangeDetectorRef) {
    this.item = new Item();
  }
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  ngOnInit() {
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

  calculate() {
    // const investorsMoney = this.getMoneyForAllInvestors(this.years, this.amount, this.percent, this.premiums);
    // const sharesForInvestors = investorsMoney;
    // this.policyLifeCycle = new PolicyLifeCycle();
    // const shareForOwner = this.getSharesForOwner(this.years, this.amount, this.premiums, this.percent);
    // this.arr.length = 0;
    // this.arr = [];
    // let otherInvestorShares = 0;
    // let testNumber = 0;
    // for (let years = this.years; years > 0; years -- ) {
    //   const a = this.calculateForYear(this.amount, years,
    //             shareForOwner, otherInvestorShares, 0, this.premiums, this.percent);
    //   otherInvestorShares += a.numOfShares;
    //   const v = {};
    //   v['percent'] = this.percent;
    //   v['sharePrice'] = a.sharePrice;
    //   v['numOfShares'] = otherInvestorShares + shareForOwner;
    //   this.policyLifeCycle.percentPerYear['' + years] = v;
    //   this.arr.push(a);
    //   testNumber ++;
    // }
    // let investorMoneyTemp = 0;
    // for (let i = 0; i < this.arr.length; i++) {
    //   const element = this.arr[i];
    //   element.anotherInvestorsShares = investorMoneyTemp;
    //   investorMoneyTemp += element.returnMoney;
    //   element.returnIfPass = parseFloat((element.returnMoney * (this.amount / (investorMoneyTemp + shareForOwner))).toFixed(0));
    // }
    // // calculate for one investor
    // let anotherInvestorsSharesTemp = 0;
    // for (let x = 0; x < this.arr.length; x ++ ) {
    //   const element = this.arr[x];
    //   anotherInvestorsSharesTemp += element.returnMoney; // this is only if share price is dolar.
    //                                                      // it's can be only if return percent not changed.
    //   element.detailsDataSource = []; // [new InvestCycle(), new InvestCycle(), new InvestCycle()];
    //   for (let x2 = element.years - 1; x2 > 0; x2--) {
    //     const details = new InvestDetails();
    //     details.years = element.years;
    //     details.thisYear = x2;
    //     details.returnIfsellThisYearMoney = element.numOfShares * this.policyLifeCycle.percentPerYear['' + x2]['sharePrice'];
    //     details.returnIfPassMoney = (this.amount / this.policyLifeCycle.percentPerYear['' + x2]['numOfShares']) * element.numOfShares;
    //     element.detailsDataSource.push(details);
    //   }
    // }
    const service = new SimulatorSevice();
    const b: CalculateObject = service.calculate2(this.amount, this.premiums, [this.percent, 0.21, 0.21]);
    this.ownerMoney = 0;
    staticArr.length = 0;
    this.arr = b.arr;
    staticArr.push.apply(staticArr, this.arr);
    this.dataSourced = new ExampleDataSource();
    this.changeDetectorRefs.detectChanges();
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
