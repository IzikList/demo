import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class MarketService {
  asks = [{ price: 998 }];
  baseData: any;
  baseBids: any;
  calculateProgress: Boolean = false;
  calculateTime = Date.now();
  data = {
    data: {
      asks: [],
      bids: [],
      all: [],
      invsetment: {
        data: {
          mArray: [{policiyIds: '' }],
          sum: 0
        }
      },
      diversification: {}
    },
    account: {
      available: 2000000,
      policies: [],
      assets: [],
      portfolioValue: 600000
    }
  };
  listeners = [];

  deepCopy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  constructor(private http: HttpClient) {
//    alert(environment.production);
    const url1 = environment.url1;
    const url2 = environment.url2;
    this.http.get(url1, {responseType: 'text' }).subscribe(data => {
      console.log(csvJSON(data));
      const mData = csvJSON(data);
      // this.uploadPolicies(mData);
      this.baseData = mData;
      const s = this.getAsks(mData);
      for (let i = 0; i < mData.length; i++) {
        const element = mData[i];
        const el2 = this.deepCopy(element);
        console.log(el2);
        // this.data.data.asks.push(el2);
        // this.data.data.bids.push(this.deepCopy(element));
      }
      this.data.data.asks.push.apply(this.data.data.asks, s);
      this.data.data.all.push.apply(this.data.data.all, this.getAllAsks(mData));
      this.listeners.forEach((x1, x2, x3) => x1.callback());
    });
    this.getDiversification();
    this.http.get(url2, { responseType: 'text' }).subscribe(data => {
        const mData = csvJSON(data);
        console.log('bidddd');
        console.log(mData);
        this.getBids(mData);
        this.baseBids = mData;
        this.baseBids.sort((x1, x2) => x1.bidPricePercent - x2.bidPricePercent);
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

  getDiversification() {
    this.http.get('../assets/objects/diver.json', {responseType: 'text' }).subscribe(data => {
      const arr = JSON.parse(data);
      const v = {};
      arr.map(function(elem) {
        v[elem.policies] = elem.diversification;
      });
      this.data.data.diversification = v;
    });
  }

  uploadPolicies(body) {
      const url2 = environment.serverUrl + 'demo/insertMany';
      console.log(environment.serverUrl);
      console.log(body);
      this.http.post(url2, body, { headers: {'Content-Type': 'application/json'} }).subscribe(data => {
        alert(data);
    });

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
    resArray.sort((x1, x2) => x2.askPricePercent - x1.askPricePercent);
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
    console.log('leave ' + this.calculateProgress + ' ' + Date.now());
    if (this.calculateProgress || Date.now() - this.calculateTime < 100) {
      console.log('leave');
      return false;
    }
    this.calculateProgress = true;
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
            thisPolicyGive = parseInt('' + amountPerPrice / (copyArray.length + 1));
            if (thisPolicyGive < 1) {
              thisPolicyGive = 1;
            }
          } else {
            thisPolicyGive = (amountPerPrice - p >= 0) ? p : amountPerPrice <= maxInP ? amountPerPrice : maxInP;
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
          data[key].policiyIds.push({ id: element.id, price: thisPolicyGive, askPricePercent: element.askPricePercent });
        }
      }
    }
    data.rest = amount;
    data.sum = fAmount - amount;
    this.data.data.invsetment.data = data;
    this.calculateProgress = false;
    this.calculateTime = Date.now();
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
    this.data.account.policies.push.apply(this.data.account.policies, policies);
    this.calculateAssests();
    this.data.account.available -= this.data.data.invsetment.data.sum;
    this.data.account.portfolioValue += this.data.data.invsetment.data.sum;
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
  }

  addBid (a, b) {
    this.baseBids.push({bidPricePercent: b, bidPriceMoney: a });
    this.calculateBids();
  }
  private getAmountForSection(amount, numOfPolicies, maxInP): number {
    const a = maxInP * numOfPolicies;
    if (a > amount) {
      return amount;
    }
    return a;
  }

  getDiver(numOfPolicies) {
    if (numOfPolicies > 200) {
      return 99;
    }
    return parseFloat(this.data.data.diversification['' + numOfPolicies]).toFixed(1);
  }

  calculateAssests() {
    const obj = {};
    this.data.account.policies.map(function (elem) {
      if (! obj[elem.askPricePercent]) {
        obj[elem.askPricePercent] = {
          policies: [],
          policiesNum: 0,
          money: 0,
          askPricePercent: elem.askPricePercent
        };
      }
      obj[elem.askPricePercent].policies.push(elem);
      obj[elem.askPricePercent].policiesNum ++;
      obj[elem.askPricePercent].money += elem.price;
    });
    const arr = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        arr.push(element);
      }
    }
    debugger;
    this.data.account.assets = arr;
  }
  getAssets() {
    debugger;
    return this.data.account;
  }
}

