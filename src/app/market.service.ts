import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  asks = [{ price: 998 }];
  baseData: any;
  baseBids: any;
  data = {
    data: {
      asks: [],
      bids: [],
      all: [],
      invsetment: {
        data: {}
      }
    },
    account: {
      available: 1000000
    }
  };
  listeners = [];

  deepCopy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }


  constructor(private http: HttpClient) {
    this.http.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQxTCd5nAjdT0ytG49miRXcD4MZ9X04pYIZGPNvFWzEtyUoMaz69D4OTvgA_zSFf9RaHgNeLoMyXucQ/pub?output=csv', { responseType: "text" }).subscribe(data => {
      console.log(csvJSON(data));
      const mData = csvJSON(data);
      this.baseData = mData;
      const s = this.getAsks(mData);
      for (let i = 0; i < mData.length; i++) {
        const element = mData[i];
        const el2 = this.deepCopy(element);
        console.log(el2);
        // this.data.data.asks.push(el2);
        //this.data.data.bids.push(this.deepCopy(element));
      }
      this.data.data.asks.push.apply(this.data.data.asks, s);
      this.data.data.all.push.apply(this.data.data.all, this.getAllAsks(mData));
      this.listeners.forEach((x1, x2, x3) => x1.callback());
    });

    this.http.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5MYVi0zQYkhJA85HI-FVIKsT0tAM7wX3NRpy4oZgQCjkKFwvyTV355TnalGvF_DyGRHVMCltnJXcC/pub?output=csv',{ responseType: "text" }).subscribe(data => {
        const mData = csvJSON(data);
        console.log('bidddd');
        console.log(mData);
        this.getBids(mData);
        this.baseBids = mData;
        this.calculateBids();
    });
    const csvJSON = function (csv) {

      const lines = csv.split('\n');
      const result = [];
      const headers = lines[0].split(',');

      lines.map(function (line, indexLine) {
        if (indexLine < 1) {
          return; // Jump header line
        }
        const obj = {};
        const currentline = line.split(',');

        headers.map(function (header, indexHeader) {
          obj[header] = currentline[indexHeader];
        });

        result.push(obj);
      });

      result.pop(); // remove the last item because undefined values
      return result; // JavaScript object
    };

  }

  getAll(): object {
    console.log('getAll');
    // this.asks = this.data.data;
    return this.data;
  }

  getAska(): object {
    return this.asks;
  }

  changeAsk() {
  }
  getAsks(data): any {
    const mArray = {};
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      console.log(element);
      if (mArray[element.askPricePercent]) {
        mArray[element.askPricePercent] += parseInt(element.askPriceMoney);
      } else {
        console.log('log ' + element.askPriceMoney);
        mArray[element.askPricePercent] = parseInt(element.askPriceMoney);
      }
    }
    console.log(mArray);
    const resArray = [];
    const names = Object.keys(mArray);
    for (let i = 0; i < names.length; i++) {
      const element = names[i];
      resArray.push({ askPricePercent: element, askPriceMoney: mArray[element] });
    }
    console.log(resArray);
    resArray.sort((x1, x2) => x1.askPricePercent - x2.askPricePercent);
    return resArray;
  }

  getAllAsks(data) {
    console.log(data);
    const array = JSON.parse(JSON.stringify(data));
    console.log(array);
    array.sort((x1, x2) => parseFloat(x2.askPricePercent) !== parseFloat(x1.askPricePercent) ?
      parseFloat(x2.askPricePercent) - parseFloat(x1.askPricePercent) :
      parseFloat(x1.askPriceMoney) - parseFloat(x2.askPriceMoney));
    console.log('getAllAsks ');
    console.log(array);
    return array;
  }

  getBids (data) {
    data.sort((x1, x2) => parseFloat(x2.bidPricePercent) - parseFloat(x1.bidPricePercent));
    console.log(data);
  }
  calculateBids() {
    const arr = [];
    const obj = {};
    for (let i = 0; i < this.baseBids.length; i++) {
      const element = this.baseBids[i];
      if (! obj[element.bidPricePercent]) {
        obj[element.bidPricePercent] = {
          bidPricePercent: element.bidPricePercent,
          bidPriceMoney: 0
        };
        arr.push(obj[element.bidPricePercent]);
      }
      obj[element.bidPricePercent].bidPriceMoney += parseInt(element.bidPriceMoney);
    }
    this.data.data.bids.splice(0, this.data.data.bids.length);
    this.data.data.bids.push.apply(this.data.data.bids, arr);
  }
  calculate(amount, maxInP, askPerCent) {
    const fAmount = amount;
    maxInP = parseInt(maxInP);
    const data = {
      low: 0,
      high: 0,
      numOfPolicies: 0,
      mArray: [],
      policies: {},
      amount: fAmount,
      rest: 0,
      sum: 0
    };

    // collect array
    const mPolicies = {};
    for (let i = 0; i < this.data.data.all.length; i++) {
      const element = this.data.data.all[i];
      if (!data.policies[element.askPricePercent]) {
        data.policies[element.askPricePercent] = [];
      }
      data.policies[element.askPricePercent].push(element);
    }

    for (const key in data.policies) {
      if (data.policies.hasOwnProperty(key)) {
        const arr = data.policies[key];
        const first = data.policies[key][0];
        if (first.askPricePercent < askPerCent) {
          break;
        }
        const numPolicies = data.policies[key].length;
        let amountPerPrice = this.getAmountForSection(amount, numPolicies, maxInP);
        const copyArray = data.policies[key];
        data[key] = {
          price: 0,
          numOfPolicies: 0,
          askPricePercent: key,
          policiyIds: []
        };
        data.mArray.push(data[key]);
        while (copyArray.length > 0) {
          if (amountPerPrice <= 0) {
            break;
          }

          const element = copyArray.shift();
          // calculate if we can diversify at all
          const p = parseInt(element.askPriceMoney);
          let thisPolicyGive = 0;
          console.log('amountPerPrice', amountPerPrice, 'copyArray.length', copyArray.length + 1);
          console.log(amountPerPrice / (copyArray.length + 1), p, data[key].price);
          if (amountPerPrice / copyArray.length <= p) {
            thisPolicyGive = parseInt(amountPerPrice / (copyArray.length + 1));
            if (thisPolicyGive < 1) {
              thisPolicyGive = 1;
            }
          } else {
            thisPolicyGive = (amountPerPrice - p >= 0) ? p : amountPerPrice;
          }
          amountPerPrice -= thisPolicyGive;
          amount -= thisPolicyGive;
          data.numOfPolicies++;
          if (thisPolicyGive > data.high) {
            data.high = thisPolicyGive;
          } else if (thisPolicyGive < data.low || data.low === 0) {
            data.low = thisPolicyGive;
          }
          data[element.askPricePercent].price += thisPolicyGive;
          data[element.askPricePercent].numOfPolicies++;
          data[key].policiyIds.push({ id: element.id, price: thisPolicyGive });
        }
      }
    }
    data.rest = amount;
    data.sum = fAmount - amount;

    console.log('mpolicies');
    console.log(data);
    console.log('ccalculate ');
    console.log(this.data.data.all);
    // for (let i = 0; i < this.data.data.all.length; i++) {
    //   console.log('amount ' + amount);
    //   if (amount < 1) {
    //     break;
    //   }
    //   const element = this.data.data.all[i];
    //   console.log('askPerCent', element.askPricePercent, askPerCent);
    //   if (element.askPricePercent < askPerCent) {
    //     break;
    //   }
    //   if (!data[element.askPricePercent]) {
    //     data[element.askPricePercent] = {
    //       price: 0,
    //       numOfPolicies: 0,
    //       askPricePercent: element.askPricePercent
    //     };
    //     data.mArray.push(data[element.askPricePercent]);
    //   }
    //   data.numOfPolicies++;
    //   let investMoney = 0;
    //   if (element.askPriceMoney < maxInP) {
    //     investMoney = parseInt(element.askPriceMoney);
    //   } else {
    //     investMoney = parseInt(maxInP);
    //   }
    //   if (investMoney > data.high) {
    //     data.high = investMoney;
    //   } else if (investMoney < data.low || data.low === 0) {
    //     data.low = investMoney;
    //   }
    //   data[element.askPricePercent].price += investMoney;
    //   data[element.askPricePercent].numOfPolicies++;
    //   amount -= investMoney;
    // console.log('calculate ' + investMoney);
    // }
    this.data.data.invsetment.data = data;
    console.log(data);
  }
  getInvest() {
    return this.data.data.invsetment;
  }
  addListener(obj) {
    this.listeners.push(obj);
  }
  getAccount() {
    return this.data.account;
  }
  buy(policies) {
    this.data.account.available -=  this.data.data.invsetment.data.sum;
    // for (let i = 0; i < mData.length; i++) {
    //   const element = mData[i];
    //   const el2 = this.deepCopy(element);
    //   console.log(el2);
    //   // this.data.data.asks.push(el2);
    //   this.data.data.bids.push(this.deepCopy(element));
    // }
    // this.data.data.all.push.apply(this.data.data.all, this.getAllAsks(mData));
    // this.listeners.forEach((x1, x2, x3) => x1.callback());
    console.log(this.baseData);
    for (let j = 0; j < policies.length; j++) {
      const el = policies[j];
      for (let i = 0; i < this.baseData.length; i++) {
        const element = this.baseData[i];
        if (el.id === element.id) {
          element.askPriceMoney -= el.price;
        }
      }
    }
    const s = this.getAsks(this.baseData);
    for (let k = 0; k < s.length; k++) {
      const element = s[k];
      for (let kk = 0; kk < this.data.data.asks.length; kk++) {
        const element2 = this.data.data.asks[kk];
        if (element2.askPricePercent === element.askPricePercent) {
          element2.askPriceMoney = element.askPriceMoney;
        }
      }
    }
    const s2 = this.getAllAsks(this.baseData);
    this.data.data.all.splice(0, this.data.data.all.length);
    this.data.data.all.push.apply(this.data.data.all, s2);

    console.log(this.baseData);
  }
  private getAmountForSection(amount, numOfPolicies, maxInP): number {
    const a = maxInP * numOfPolicies;
    if (a > amount) {
      return amount;
    }
    return a;
  }
}

