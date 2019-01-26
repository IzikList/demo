import { Component, OnInit } from '@angular/core';
import { PolicyLifeCycle, CalculateObject, InvestCycle, InvestDetails, SimulatorSevice } from '../simulaor/policyLifeCycle';


  const ExcelFormulas = {

  PVIF: function(rate, nper) {
    return Math.pow(1 + rate, nper);
  },

  FVIFA: function(rate, nper) {
  return rate === 0 ? nper : (this.PVIF(rate, nper) - 1) / rate;
  },

  PMT: function(rate, nper, pv, fv, type) {
    if (!fv) {
      fv = 0;
    }
    if (!type) {
      type = 0;
    }

  if (rate === 0) { return -(pv + fv) / nper; }

    const pvif = Math.pow(1 + rate, nper);
    let pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type === 1) {
      pmt /= (1 + rate);
    }

    return pmt;
  },

  IPMT: function(pv, pmt, rate, per) {
    const tmp = Math.pow(1 + rate, per);
    return 0 - (pv * tmp * rate + pmt * (tmp - 1));
  },

  PPMT: function(rate, per, nper, pv, fv, type) {
    if (per < 1 || (per >= nper + 1)) { return null; }
    const pmt = this.PMT(rate, nper, pv, fv, type);
    const ipmt = this.IPMT(pv, pmt, rate, per - 1);
    return pmt - ipmt;
  },

 DaysBetween: function(date1, date2) {
   const oneDay = 24 * 60 * 60 * 1000;
   return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
 },

// Change Date and Flow to date and value fields you use
 XNPV: function(rate, values) {
		var xnpv = 0.0;
		var firstDate = new Date(values[0].Date);
		for (var key in values) {
			var tmp = values[key];
			var value = tmp.Flow;
			var date = new Date(tmp.Date);
			xnpv += value / Math.pow(1 + rate, this.DaysBetween(firstDate, date)/365);
		};
		return xnpv;
	},

  XIRR: function(values, guess: number) {
		if (!guess) guess = 0.1;
		
		var x1 = 0.0;
		var x2 = guess;
		var f1 = this.XNPV(x1, values);
		var f2 = this.XNPV(x2, values);
		
		for (var i = 0; i < 100; i++) {
			if ((f1 * f2) < 0.0) break;
			if (Math.abs(f1) < Math.abs(f2)) {
				f1 = this.XNPV(x1 += 1.6 * (x1 - x2), values);
			}
			else {
				f2 = this.XNPV(x2 += 1.6 * (x2 - x1), values);
			}
		};
		
		if ((f1 * f2) > 0.0) { return null; }
		
		var f = this.XNPV(x1, values);
		if (f < 0.0) {
			var rtb = x1;
			var dx = x2 - x1;
		}
		else {
			var rtb = x2;
			var dx = x1 - x2;
		};
		
		for (var i = 0; i < 100; i++) {
			dx *= 0.5;
			var x_mid = rtb + dx;
			var f_mid = this.XNPV(x_mid, values);
			if (f_mid <= 0.0) rtb = x_mid;
			if ((Math.abs(f_mid) < 1.0e-6) || (Math.abs(dx) < 1.0e-6)) return x_mid;
		};
		
		return null;
	}

};

@Component({
  selector: 'app-simulator-ivolving-le',
  templateUrl: './simulator-ivolving-le.component.html',
  styleUrls: ['./simulator-ivolving-le.component.css']
})
export class SimulatorIvolvingLeComponent implements OnInit {

  constructor() { }

  death = [53, 70, 83, 91, 93, 96, 94, 87, 80, 74, 62, 48, 33, 20, 10, 4, 2];
  // death = [50, 64, 73, 91, 93, 96, 94, 87, 80, 74, 62, 48, 33, 20, 20, 10, 5];
  le = [6.4, 5.7, 5.1, 4.6, 4.1, 3.7, 3.3, 2.9, 2.5, 2.2, 1.9, 1.6, 1.4, 1.2, 1.0, 0.8, 0.5];
  cfYears = {};
  objectKeys = Object.keys;
  cfInvest = 0;


  ngOnInit() {
  }

  calculate() {
    // this.cashFlow();
    this.realCycle();
    if ( 5 < 6 ) {
      return;
    }
    const pol = new SimulatorSevice();
    let invest = 0;
    let ret = 0;
    const arr = [0.21];
    let years = [];

    // years loop
    for (let x = this.death.length - 1; x > 0; x--) {
      const eleem = this.death[x];
      let retPerYear = 0;
      let pc = 0;
      let ab;
      // policy
      for (let r = 1; r <= eleem; r ++) {
        const aa = pol.calculate3(1000 * 1000, 36 * 1000, arr, x);
        ab = aa;
        invest += 36 * 1000;
        ret += aa.arr[0].returnMoney;
        retPerYear += aa.arr[0].returnMoney;
        pc = this.getIRRByReturn(x, 36 * 1000, aa.arr[0].returnMoney);
      }
      console.log('ttr year: ' + (x + 1) +  ' ' +  retPerYear /  eleem + '   ' + eleem);
      console.log('ttr percent: ' +  ' ' +  pc);
      console.log(ab);
      years.push(retPerYear);
    }
    console.log(invest);
    console.log(ret);
    console.log(years);
  }


  cashFlow() {
    const pol = new SimulatorSevice();
    let invest = 0;
    let ret = 0;
    const arr = [0.15];
    const years = [];

    // one investor - all years take all years in calculation
    // years loop
    let cfInvest = 0;
    const cfYears = {};
    for (let x = this.death.length - 1; x > 0; x--) {
      const eleem = this.death[x];
      let retPerYear = 0;
      let pc = 0;
      let ab;
      const thisYearObj = {returnMoney: 0, returnMoneySum: 0};
      cfYears['' + (x + 1)] = thisYearObj;
      // policy
      for (let r = 1; r <= eleem; r ++) {
        const aa = pol.calculate3(1000 * 1000, 36 * 1000, arr, x);
        ab = aa;
        invest += 36 * 1000;
        ret += aa.arr[0].returnMoney;
        cfInvest += aa.arr[0].premium;
        thisYearObj.returnMoney += aa.arr[0].returnMoney;
        retPerYear += aa.arr[0].returnMoney;
        pc = this.getIRRByReturn(x, 36 * 1000, aa.arr[0].returnMoney);
      }
      console.log('ttr year: ' + (x + 1) +  ' ' +  retPerYear /  eleem + '   ' + eleem);
      console.log('ttr percent: ' +  ' ' +  pc);
      console.log(ab);
      years.push(retPerYear);
    }
    cfYears['' + 1] = {returnMoney: 0, returnMoneySum: 0};
    console.log(invest);
    console.log(ret);
    console.log(years);
    console.log(cfInvest);
    console.log(cfYears);
    const arrToOrder = [];
    for (const k in cfYears) {
      if (cfYears.hasOwnProperty(k)) {
        const elem = cfYears[k];
        arrToOrder[parseInt(k, 0)] = elem.returnMoney;
      }
    }
    let sum = 0;
    for (let i = 0; i < arrToOrder.length; i++) {
      if (cfYears['' + i]) {
        const e = arrToOrder[i];
        sum += e;
        cfYears ['' + i].returnMoneySum = sum;
      }
    }

    this.cfYears = cfYears;
    this.cfInvest = cfInvest;
  }

  realCycle() {
    // one time invest
    const pol = new SimulatorSevice();
    const cfYears = {};
    let retMoneySum = 0;
    let sharesPerPolicy = 0;
    let policyRest = 1000;
    const assets = [];
    let numOfRestBefore = 1000;
    // increment years
    for (let i = 0; i < this.death.length; i++) {
      const numOfPeople = this.death[i];
      let currentObj;
      console.log('Year ' + i);
      const arr = [];
      const thisYearObj = {returnMoney: 0, returnMoneySum: 0, people: numOfPeople};
      cfYears['' + (i + 1)] = thisYearObj;
      let sharePrice;
      for (let i2 = 0; i2 < numOfPeople; i2++) {
        if ( i === 0 && i2 === 0) {
          sharesPerPolicy = pol.calculate3(1000 * 1000, 36 * 1000, [0.15], i).arr[0].numOfShares;
        }
        const a = pol.calculate3(1000 * 1000, 36 * 1000, [0.15], i);
        currentObj = a;
        thisYearObj.returnMoney += a.arr[0].returnMoney;
        arr.push(a);
      }
      retMoneySum += thisYearObj.returnMoney;
      thisYearObj.returnMoneySum = retMoneySum;
      console.log(arr);
      if (i > 0) {
        sharePrice = currentObj.arr[i].premium / currentObj.arr[i].numOfShares;
        assets['' + (i)] = (policyRest * (sharesPerPolicy / 360)  * sharePrice);
        console.log(policyRest, currentObj.arr[i].premium , sharesPerPolicy, currentObj.arr[i].numOfShares, sharePrice);
      }
      policyRest -= numOfPeople;
    }
    this.cfYears = cfYears;
    this.cfInvest = 1000 * 1000 * 36;
    const arr2 = [];
    arr2.push({Flow: -1000 * 1000 * 36, Date: new Date(2016, 0, 15)});

    let year = 2016;
    const tt = [];
    for (const key in cfYears) {
      if (cfYears.hasOwnProperty(key)) {
        const element = cfYears[key];
        year++;
        arr2.push({Flow: element.returnMoney, Date: new Date(year, 0, 15)});
        tt.push(element.returnMoney / 360);
      }
    }

    console.log(arr2);
    console.log(ExcelFormulas.XIRR(arr2, 1));
    console.log(tt);
    console.log(assets);

    // const rate = xirr([
    //   {amount: -1000 * 1000 * 36, when: new Date(2016, 0, 15)},
    //   {amount: -2500, when: new Date(2016, 1, 8)},
    //   {amount: -1000, when: new Date(2016, 3, 17)},
    //   {amount: 5050, when: new Date(2016, 7, 24)},
    // ]);
  }

  realCycle2() {
    // one time invest
    const death = [53,  70,   83,   91,   93,   96,   94,   87,    80,  74,  62,  48,  33,  20,  10,   4,   2];
    const le =    [6.4, 5.7, 5.1,  4.6,   4.1, 3.7,  3.3,  2.9,   2.5, 2.2, 1.9, 1.6, 1.4, 1.2, 1.0, 0.8, 0.5];

    const pol = new SimulatorSevice();
    const cfYears = {};
    let retMoneySum = 0;
    // increment years
    for (let i = 0; i < this.death.length; i++) {
      const numOfPeople = this.death[i];
      console.log('Year ' + i);
      const arr = [];
      const thisYearObj = {returnMoney: 0, returnMoneySum: 0, people: numOfPeople};
      cfYears['' + (i + 1)] = thisYearObj;
      for (let i2 = 0; i2 < numOfPeople; i2++) {
        const a = pol.calculate3(1000 * 1000, 36 * 1000, [0.15], i);
        thisYearObj.returnMoney += a.arr[0].returnMoney;
        arr.push(a);
      }
      retMoneySum += thisYearObj.returnMoney;
      thisYearObj.returnMoneySum = retMoneySum;
      console.log(arr);
    }
    this.cfYears = cfYears;
    this.cfInvest = 1000 * 1000 * 36;
    const arr2 = [];
    arr2.push({Flow: -1000 * 1000 * 36, Date: new Date(2016, 0, 15)});

    let year = 2016;
    for (const key in cfYears) {
      if (cfYears.hasOwnProperty(key)) {
        const element = cfYears[key];
        year++;
        arr2.push({Flow: element.returnMoney, Date: new Date(year, 0, 15)});
      }
    }

    console.log(arr2);
    console.log(ExcelFormulas.XIRR(arr2, 1));

  }

  getIRRByReturn(years, investMoney, returnMoney) {
    const returnPercent = ((returnMoney / investMoney) - 1) * 100;
    const pcPerYear = Math.pow((1 + (returnPercent / 100)), 1 / years) - 1;
    return pcPerYear * 100;
  }

}
