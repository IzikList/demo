import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() {
  }

  leArray = [53,
    70,
    83,
    91,
    93,
    96,
    94,
    87,
    80,
    74,
    62,
    48,
    33,
    20,
    10,
    4,
    2];

    allArray = {
      '10': [0.03962, 0.04227, 0.04489, 0.04740, 0.04985, 0.05195, 0.05396, 0.05541,
        0.05690, 0.05769, 0.05765, 0.05672, 0.05485, 0.05204, 0.04835, 0.04393, 0.03894, 0.03362, 0.02823, 0.02300, 0.01815, 0.01385,
        0.03073],
      '9': [0.04890, 0.05163, 0.05430, 0.05659, 0.05878, 0.06035, 0.06198, 0.06283, 0.06280, 0.06178,
         0.05974, 0.05668, 0.05266, 0.04784, 0.04241, 0.03662, 0.03074, 0.02505, 0.01977, 0.01509, 0.03347],
      '8': [0.06037, 0.06291, 0.06534, 0.06710, 0.06890, 0.06985, 0.06981,
         0.06869, 0.06642, 0.06301, 0.05855, 0.05319, 0.04715, 0.04072, 0.03418, 0.02785, 0.02198, 0.01677, 0.03721],
      '7': [0.07453, 0.07653, 0.07859, 0.07967, 0.07963, 0.07835, 0.07575, 0.07187, 0.06678, 0.06067,
         0.05379, 0.04644, 0.03899, 0.03176, 0.02507, 0.01913, 0.04244],
      '6': [0.09258, 0.09385, 0.09380, 0.09229, 0.08924, 0.08466, 0.07867, 0.07147,
         0.06336, 0.05471, 0.04592, 0.03741, 0.02953, 0.02254, 0.04999],
      '5': [0.12822, 0.12398, 0.11762, 0.10930, 0.09929, 0.08802, 0.07601, 0.06380, 0.05198, 0.04102, 0.03131, 0.06945],
      '4': [0.17343, 0.15756, 0.13968, 0.12061, 0.10125, 0.08248, 0.06510, 0.04969, 0.11021],
      '3': [0.24772, 0.20180, 0.15927, 0.12157, 0.26964],
      '2': [1]
    };

    getLePerYear(year): number[] {
      const array = this.allArray['' + year];
      const returnArray = [];
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        returnArray.push(Math.floor(element * 1000));
      }
      return returnArray;
    }
  // calculate(premiums, les, sumOfPeople, irr, amount): Summary {
  //   const mArray = this.getPremiumsMap(premiums, les, sumOfPeople, irr, amount);
  //   let allInvestorsMoney = 0;
  //   let allInvestorsPc = 0;
  //   for (let index = 0; index < mArray.length; index++) {
  //     const element = mArray[index];
  //     allInvestorsMoney += element.returnMoney;
  //     allInvestorsPc += element.pcFromAmount;
  //   }
  //   const summary: Summary = new Summary();
  //   summary.amount = amount;
  //   summary.premiumsMap = mArray;
  //   const initShares = 1000 * 1000;
  //   const totalShares = amount; // (1 + allInvestorsPc * (1 / (1 - allInvestorsPc))) * initShares;
  //   console.log({
  //     allInvestorsMoney: allInvestorsMoney,
  //     allInvestorsPc: allInvestorsPc,
  //     initShares: initShares,
  //     totalShares: totalShares
  //   });
  //   // let tempLes = JSON.parse(JSON.stringify(les));
  //   // for (let k = 0; k < les.length; k++) {
  //   //   const element = les[k];
  //   // }
  //   summary.issueObj = this.getIssueMap(premiums, les, sumOfPeople, irr, amount, mArray, totalShares);
  //   summary.allInvestorsMoney = allInvestorsMoney;
  //   summary.allInvestorsPc = allInvestorsPc;

  //   return summary;
  // }

  calculate(premiums, les, sumOfPeople, irr, amount): Summary {
    const mArray = this.getPremiumsMap(premiums, les, sumOfPeople, irr, amount);
    let allInvestorsMoney = 0;
    let allInvestorsPc = 0;
    for (let index = 0; index < mArray.length; index++) {
      const element = mArray[index];
      allInvestorsMoney += element.returnMoney;
      allInvestorsPc += element.pcFromAmount;
    }
    const summary: Summary = new Summary();
    summary.amount = amount;
    summary.premiumsMap = mArray;
    const initShares = 1000 * 1000;
    const totalShares = amount; // (1 + allInvestorsPc * (1 / (1 - allInvestorsPc))) * initShares;
    console.log({
      allInvestorsMoney: allInvestorsMoney,
      allInvestorsPc: allInvestorsPc,
      initShares: initShares,
      totalShares: totalShares
    });
    const tempLes = JSON.parse(JSON.stringify(les));
    summary.issueObj = this.getIssueMap(premiums, les, sumOfPeople, irr, amount, JSON.parse(JSON.stringify(mArray)), totalShares, amount);
    for (let k = 1; k < les.length; k++) {
      const element = les[k];
      tempLes.shift();
      sumOfPeople = this.getSumFromArray(tempLes);
      const pmaps = this.getPremiumsMap(premiums, tempLes, sumOfPeople, irr, amount);
      summary.premiumsMap[k] = pmaps[0];
      summary.issueObj[k] = this.getIssueMap(premiums, tempLes, sumOfPeople, irr, amount, pmaps,
       summary.issueObj[k - 1].totalShares, amount)[0];
    }
    summary.allInvestorsMoney = allInvestorsMoney;
    summary.allInvestorsPc = allInvestorsPc;

    return summary;
  }

  getSumFromArray(arr) {
    let sum = 0;
    for (let p = 0; p < arr.length; p++) {
      sum += arr[p];
    }
    return sum;
  }


  getIssueMap(premiums, les, sumOfPeople, irr, amount, pMap: PremiumsMap[], totalShares: number, sellerShares: number): IssueMapObj[] {
    const mArray: IssueMapObj[] = [];
    let totalAllInvestorsShares = totalShares - sellerShares;
    let totalPcForAllInvestors = 0;
    let cashForInvestors = 0;
    let cashForSeller = 0;
    let instantSaleOfSeller = 0;
    const investorsPcFromPolicyAtTheEnd = this.getInvestorPcAtTheEnd(pMap);
    const onTop = 1 / (1 - investorsPcFromPolicyAtTheEnd);
    const investorsSharesAtTheEnd = totalShares * onTop;

    for (let index = 0; index < pMap.length; index++) {
      const obj = new IssueMapObj();
      const element = pMap[index];
      const sharesForInvestor = element.pcFromAmount * investorsSharesAtTheEnd;
      totalShares += sharesForInvestor;
      totalAllInvestorsShares += sharesForInvestor;
      totalPcForAllInvestors = totalAllInvestorsShares / totalShares;
      const currentPcFromPolicy = sharesForInvestor / totalShares;

      cashForInvestors = amount * totalPcForAllInvestors;
      cashForSeller = amount - cashForInvestors;

      obj.currentPcFromPolicy = totalPcForAllInvestors;
      obj.sellerShares = amount;
      obj.sharesForInvestor = sharesForInvestor;
      obj.totalShares = totalShares;
      obj.sharePrice = premiums[0] / sharesForInvestor;
      obj.cashForInvestors = cashForInvestors;
      obj.cashForSeller = cashForSeller;
      obj.pcForAllInvestors = totalPcForAllInvestors;

      // for calculation only
      obj.investorsPcFromPolicyAtTheEnd = investorsPcFromPolicyAtTheEnd;
      obj.onTop = onTop;
      obj.totalSharesAtTheEnd = investorsSharesAtTheEnd;
      obj.premiumsMap = pMap;

      mArray.push(obj);
    }
    console.log(mArray);
    return mArray;
  }

  getPremiumsMap(premiums, les, sumOfPeople, irr, amount):
      PremiumsMap[] {
    let dies = 0;
    const mArray: PremiumsMap[] = [];
    for (let index = 0; index < les.length; index++) { // years
      const element2 = les[index];
      const innerElement: PremiumsMap = new PremiumsMap();
      mArray.push(innerElement);
      for (let i = index, x = 0; i < les.length; i++ , x++) { // calculate premiums for year
        const element = les[i];
        // calculate premiums weight
        const weight = element / (sumOfPeople - dies);
        // console.log(weight, this.irrPc(irr, x), premiums[0] * weight * this.irrPc(irr, x) );
        const irrEnd = this.irrPc(irr, x);
        const returnMoney = premiums[0] * weight * irrEnd;
        innerElement.arr.push(returnMoney);
        innerElement.returnMoney += returnMoney;
      }
      innerElement.livesThisYear = sumOfPeople - dies;
      innerElement.diesThisYear = element2;
      const weight2 = index === 0 ? 1 : innerElement.livesThisYear / sumOfPeople;
      innerElement.calculationStrinForDebug = 'weight2 =  ' + weight2 + ' (index  = ' + index +
        '; livesThisYear: ' + innerElement.livesThisYear + '; sumOfPeople: ' + sumOfPeople + ')';
      console.log(innerElement.calculationStrinForDebug);
      innerElement.pcFromAmount = innerElement.returnMoney / amount * weight2;
        // ((innerElement.livesThisYear - innerElement.diesThisYear) / sumOfPeople);
      dies += element2;
    }
    console.log(mArray);
    return mArray;
  }

  irrPc(irr, years) {
    return Math.pow(1 + irr, years + 0.5);
  }


  getMoneyPerYear(map) {
    const mArray = [];
    for (let index = 0; index < map.length; index++) {
      const element = map[index];
      const obj = { year: element.year, money: 0 };

    }
  }



  getInvestorPcAtTheEnd(pm: PremiumsMap[]): number {
    let a = 0;
    for (let i = 0; i < pm.length; i++) {
      const element = pm[i];
      a += element.pcFromAmount;
    }
    return a;
  }
}

export class PremiumsMap {
  year;
  arr: number[] = [];
  returnMoney = 0;
  livesThisYear = 0;
  diesThisYear = 0;
  pcFromAmount = 0;

  calculationStrinForDebug: String;
  constructor() {
  }
}

export class IssueMapObj {
  sharesForInvestor: number;
  totalShares: number; // total shares right now
  totalInvestorShares: number; // total investors shares right now
  sharePrice; // calcualte by this issue
  sellerShares; // not changed,  base on amount
  sumOfShares;

  currentPcFromPolicy; // investor percent from the policy right now
  pcForAllInvestors: number;
  totalPcForInvestors: number;
  seller;
  cashForInvestors;
  cashForSeller;
  instantSaleOfSeller;

  investorsPcFromPolicyAtTheEnd = 0;
  onTop = 0;
  totalSharesAtTheEnd: number; // total shares at the and regrade to this calculation
  premiumsMap: PremiumsMap[];
  calculationStringForDebug: String;
}


export class Summary {
  premiumsMap: PremiumsMap[];
  issueObj: IssueMapObj[];
  allInvestorsMoney: number;
  allInvestorsPc: number;
  amount: number;

  constructor() {
  }
}
