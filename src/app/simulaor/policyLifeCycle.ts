export class PolicyLifeCycle {
    le: number;
    amount: number;
    investorsMoney: number;
    percentPerYear: {} = {};
}

export class InvestCycle {
    amount: number;
    premium: number;
    years: number;
    returnPerCent: number;
    returnMoney: number;
    numOfShares: number;
    sharePrice: number;
    returnIfPass: number;
    detailsDataSource: any;
    anotherInvestorsShares: number;
    anotherInvestorsMoney: number;
    ownerShares: number;
}

export class InvestDetails {
    thisYear: number;
    years: number;
    investMoney: number;
    investPercent: number;
    returnIfPassThisYearMoney: number;
    returnIfPassThisYearPercent: number;
    returnIfsellThisYearMoney: number;
    returnIfsellThisYearPercent: number;
    returnIfPassMoney: number;
}

export class SimulatorSevice {
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
        const shareForOwner = amount - sharesForInvestors;
        return shareForOwner;
    }

    getMoneyForAllInvestors(years, amount, percent, premiums) {
        let investorsMoney = 0;
        const arr: InvestCycle[] = [];
        for (let i = years; i > 0; i--) {
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
        invest.ownerShares = sharesForOwner;

        // calcualte how many shares for this invest if all rest premiums will sell this price
        let newMoneyToReturn = money;
        for (let i = years - 1; i >= 1; i--) {
            newMoneyToReturn += this.getMoneyForPercent(i, percent, premiumsPrice);
        }
        const allShares = sharesForOwner + sharesOtherInvestors;
        const sharePriceWithNewMoney = (amount - newMoneyToReturn) / allShares; // existsing shares prices

        invest.numOfShares = money / sharePriceWithNewMoney;
        invest.sharePrice = parseFloat((premiumsPrice / invest.numOfShares).toFixed(2));
        return invest;
    }


    calculate(amount, years, premiums, percent) {
        const policyLifeCycle = new PolicyLifeCycle();
        let arr: InvestCycle[] = [];
        const shareForOwner = this.getSharesForOwner(years, amount, premiums, percent);
        arr = [];
        let otherInvestorShares = 0;
        let testNumber = 0;
        for (let year = years; year > 0; year--) {
            const a = this.calculateForYear(amount, year,
                shareForOwner, otherInvestorShares, 0, premiums, percent);
            otherInvestorShares += a.numOfShares;
            const v = {};
            v['percent'] = percent;
            v['sharePrice'] = a.sharePrice;
            v['numOfShares'] = otherInvestorShares + shareForOwner;
            policyLifeCycle.percentPerYear['' + year] = v;
            arr.push(a);
            testNumber++;
        }
        let investorMoneyTemp = 0;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            element.anotherInvestorsShares = investorMoneyTemp;
            investorMoneyTemp += element.returnMoney;
            element.returnIfPass = parseFloat((element.returnMoney * (amount / (investorMoneyTemp + shareForOwner))).toFixed(0));
        }
        // calculate for one investor
        let anotherInvestorsSharesTemp = 0;
        for (let x = 0; x < arr.length; x++) {
            const element = arr[x];
            anotherInvestorsSharesTemp += element.returnMoney; // this is only if share price is dolar.
            // it's can be only if return percent not changed.
            element.detailsDataSource = []; // [new InvestCycle(), new InvestCycle(), new InvestCycle()];
            for (let x2 = element.years - 1; x2 > 0; x2--) {
                const details = new InvestDetails();
                details.years = element.years;
                details.thisYear = x2;
                details.returnIfsellThisYearMoney = element.numOfShares * policyLifeCycle.percentPerYear['' + x2]['sharePrice'];
                details.returnIfPassMoney = (amount / policyLifeCycle.percentPerYear['' + x2]['numOfShares']) * element.numOfShares;
                element.detailsDataSource.push(details);
            }
        }
        const ownerMoney = shareForOwner;
        const returnObj = new CalculateObject();
        returnObj.amount = amount;
        returnObj.arr = arr;
        return {
            amount: amount,
            arr: arr,
            policyLifeCycle: policyLifeCycle
        };
    }

    calculate2(amount, premiums, percents) {
        const policyLifeCycle = new PolicyLifeCycle();
        const years = percents.length;
        let arr: InvestCycle[] = [];
        const shareForOwner = this.getSharesForOwner(years, amount, premiums, percents[percents.length - 1]);
        arr = [];
        let otherInvestorShares = 0;
        let testNumber = 0;
        for (let year = years; year > 0; year--) {
            const a = this.calculateForYear(amount, year,
                shareForOwner, otherInvestorShares, 0, premiums, percents[year - 1]);
            otherInvestorShares += a.numOfShares;
            const v = {};
            v['percent'] = percents[year - 1];
            v['sharePrice'] = a.sharePrice;
            v['numOfShares'] = otherInvestorShares + shareForOwner;
            policyLifeCycle.percentPerYear['' + year] = v;
            arr.push(a);
            testNumber++;
        }
        let investorMoneyTemp = 0;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            element.anotherInvestorsShares = investorMoneyTemp;
            investorMoneyTemp += element.returnMoney;
            element.returnIfPass = parseFloat((element.returnMoney * (amount / (investorMoneyTemp + shareForOwner))).toFixed(0));
        }
        // calculate for one investor
        let anotherInvestorsSharesTemp = 0;
        for (let x = 0; x < arr.length; x++) {
            const element = arr[x];
            anotherInvestorsSharesTemp += element.returnMoney; // this is only if share price is dolar.
            // it's can be only if return percent not changed.
            element.detailsDataSource = []; // [new InvestCycle(), new InvestCycle(), new InvestCycle()];
            for (let x2 = element.years - 1; x2 > 0; x2--) {
                const details = new InvestDetails();
                details.years = element.years;
                details.thisYear = x2;
                details.returnIfsellThisYearMoney = element.numOfShares * policyLifeCycle.percentPerYear['' + x2]['sharePrice'];
                details.returnIfPassMoney = (amount / policyLifeCycle.percentPerYear['' + x2]['numOfShares']) * element.numOfShares;
                element.detailsDataSource.push(details);
            }
        }
        const ownerMoney = shareForOwner;
        const returnObj = new CalculateObject();
        returnObj.amount = amount;
        returnObj.arr = arr;
        return {
            amount: amount,
            arr: arr,
            policyLifeCycle: policyLifeCycle
        };
    }
}

export class CalculateObject {
    amount: number;
    arr: InvestCycle[];
    policyLifeCycle: PolicyLifeCycle;
}
