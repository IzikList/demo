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
    returnIRR: number;
    irr: number;
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
        const pcPerYear = Math.pow((1 + (returnPercent / 100)), 1 / years) - 1;
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
    getSharesForOwner3(years, amount, premium, startPercent) {
        const allInvestorMoney = this.getMoneyForAllInvestors3(years, amount, startPercent, premium);
        const sharesForInvestors = allInvestorMoney;
        const shareForOwner = amount - sharesForInvestors;
        return shareForOwner;
    }


    getSharesForOwner4(les, years, amount, premiums, startPercent) {
        const allInvestorMoney = this.getMoneyForAllInvestors4(les, years, amount, startPercent, premiums);
        const sharesForInvestors = allInvestorMoney;
        const shareForOwner = amount - sharesForInvestors;
        return shareForOwner;
    }

    getSharesForMonth(month, amount, premiumPerMonth, startPercent) {
        const allInvestorMoney = this.getMoneyForAllInvestors(month, amount, startPercent, premiumPerMonth);
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
    getMoneyForAllInvestors3(years, amount, percent, premiums) {
        let investorsMoney = 0;
        const arr: InvestCycle[] = [];
        for (let i = 0; i < years.length; i++) {
            const money = this.getMoneyForPercent(years[i], percent, premiums);
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

    getMoneyForAllInvestors4(les, years, amount, percent, premiums) {
        let investorsMoney = 0;
        const arr: InvestCycle[] = [];
        for (let i = les.length, x = 0; i > 0; i--, x++) {
            if (x >= years) {
                break;
            }
            const money = this.getMoneyForPercent(les[x], percent, premiums[x]);
            investorsMoney += money;
            const item = new InvestCycle();
            item.amount = amount;
            item.years = i;
            item.premium = premiums[x];
            item.returnMoney = money;
            item.sharePrice = parseFloat((premiums[x] / item.returnMoney).toFixed(2));
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
        // invest.returnIRR = this.getIRRByReturn(years, invest.premium, invest.returnMoney);

        // calcualte how many shares for this invest if all rest premiums will sell this price
        let newMoneyToReturn = money;
        for (let i = years - 1; i >= 0; i--) {
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

        // calculate returned money after al shares
        const pricePerShare = amount / (otherInvestorShares + shareForOwner);
        for (let year = years - 1; year >= 0; year--) {
            const element = arr[year];
            element.returnMoney = parseFloat((element.numOfShares * pricePerShare).toFixed(2));
            element.irr = this.getIRRByReturn(element.years, element.premium, element.returnMoney);
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
        const ownerMoney = parseFloat((shareForOwner * pricePerShare).toFixed(2));
        const returnObj = new CalculateObject();
        returnObj.amount = amount;
        returnObj.arr = arr;
        return {
            amount: amount,
            arr: arr,
            policyLifeCycle: policyLifeCycle,
            ownerMoney: ownerMoney
        };
    }


    calculatePerMOnth(amount, percents, premiums) {
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

        // calculate returned money after al shares
        const pricePerShare = amount / (otherInvestorShares + shareForOwner);
        for (let year = years - 1; year >= 0; year--) {
            const element = arr[year];
            element.returnMoney = parseFloat((element.numOfShares * pricePerShare).toFixed(2));
            element.irr = this.getIRRByReturn(element.years, element.premium, element.returnMoney);
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
        const ownerMoney = parseFloat((shareForOwner * pricePerShare).toFixed(2));
        const returnObj = new CalculateObject();
        returnObj.amount = amount;
        returnObj.arr = arr;
        return {
            amount: amount,
            arr: arr,
            policyLifeCycle: policyLifeCycle,
            ownerMoney: ownerMoney
        };

    }

    // 7 years
    calculate3(amount, premiums, percents, stop) {
        const policyLifeCycle = new PolicyLifeCycle();
        let arr: InvestCycle[] = [];
        const shareForOwner = this.getSharesForOwner3([6.4, 5.7, 5.1, 4.6, 4.1, 3.7, 3.3], amount, premiums, percents[percents.length - 1]);
        arr = [];
        let otherInvestorShares = 0;
        let testNumber = 0;
        const le = [6.4, 5.7, 5.1, 4.6, 4.1, 3.7, 3.3, 2.9, 2.5, 2.2,  1.9, 1.6, 1.4, 1.2, 1.0, 0.8, 0.5];
        for (let i = 0, y = 7; i < le.length; i++, y --) {
            if (i > stop) {
                break;
            }
            const a = this.calculateForYear(amount, le[i],
                shareForOwner, otherInvestorShares, 0, premiums, percents[0]);
            otherInvestorShares += a.numOfShares;
            const v = {};
            v['percent'] = percents[0];
            v['sharePrice'] = a.sharePrice;
            v['numOfShares'] = otherInvestorShares + shareForOwner;
            policyLifeCycle.percentPerYear['' + y] = v;
            a.years = le[i];
            arr.push(a);
            testNumber++;
        }

        // calculate returned money after al shares
        const pricePerShare = amount / (otherInvestorShares + shareForOwner);
        for (let year = arr.length - 1; year >= 0; year--) {
            // if (! arr[year]) {
            //     break;
            // }
            const element = arr[year];
            element.returnMoney = parseFloat((element.numOfShares * pricePerShare).toFixed(2));
            element.irr = this.getIRRByReturn(element.years, element.premium, element.returnMoney);
        }

        let investorMoneyTemp = 0;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            // if (! element) {
            //     break;
            // }
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
                if (! policyLifeCycle.percentPerYear['' + x2]) {
                    break;
                }
                details.years = element.years;
                details.thisYear = x2;
                // console.log('x2 ' + x2 + ' x ' + x );
                details.returnIfsellThisYearMoney = element.numOfShares * policyLifeCycle.percentPerYear['' + x2]['sharePrice'];
                details.returnIfPassMoney = (amount / policyLifeCycle.percentPerYear['' + x2]['numOfShares']) * element.numOfShares;
                element.detailsDataSource.push(details);
            }
        }
        const ownerMoney = parseFloat((shareForOwner * pricePerShare).toFixed(2));
        const returnObj = new CalculateObject();
        returnObj.amount = amount;
        returnObj.arr = arr;
        return {
            amount: amount,
            arr: arr,
            policyLifeCycle: policyLifeCycle,
            ownerMoney: ownerMoney
        };
    }

    // 7 years
    calculate4(amount, premiums, percents, stop) {
        const policyLifeCycle = new PolicyLifeCycle();
        let arr: InvestCycle[] = [];
        const le = [6.4, 5.7, 5.1, 4.6, 4.1, 3.7, 3.3, 2.9, 2.5, 2.2,  1.9, 1.6, 1.4, 1.2, 1.0, 0.8, 0.5];
        const shareForOwner = this.getSharesForOwner4(le, stop, amount, premiums, percents[percents.length - 1]);
        arr = [];
        let otherInvestorShares = 0;
        let testNumber = 0;
        for (let i = 0, y = 7; i < le.length; i++, y --) {
            if (i > stop) {
                break;
            }
            const a = this.calculateForYear(amount, le[i],
                shareForOwner, otherInvestorShares, 0, premiums, percents[0]);
            otherInvestorShares += a.numOfShares;
            const v = {};
            v['percent'] = percents[0];
            v['sharePrice'] = a.sharePrice;
            v['numOfShares'] = otherInvestorShares + shareForOwner;
            policyLifeCycle.percentPerYear['' + y] = v;
            a.years = y;
            arr.push(a);
            testNumber++;
        }

        // calculate returned money after al shares
        const pricePerShare = amount / (otherInvestorShares + shareForOwner);
        for (let year = arr.length - 1; year >= 0; year--) {
            // if (! arr[year]) {
            //     break;
            // }
            const element = arr[year];
            element.returnMoney = parseFloat((element.numOfShares * pricePerShare).toFixed(2));
            element.irr = this.getIRRByReturn(element.years, element.premium, element.returnMoney);
        }

        let investorMoneyTemp = 0;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            // if (! element) {
            //     break;
            // }
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
                if (! policyLifeCycle.percentPerYear['' + x2]) {
                    break;
                }
                details.years = element.years;
                details.thisYear = x2;
                // console.log('x2 ' + x2 + ' x ' + x );
                details.returnIfsellThisYearMoney = element.numOfShares * policyLifeCycle.percentPerYear['' + x2]['sharePrice'];
                details.returnIfPassMoney = (amount / policyLifeCycle.percentPerYear['' + x2]['numOfShares']) * element.numOfShares;
                element.detailsDataSource.push(details);
            }
        }
        const ownerMoney = parseFloat((shareForOwner * pricePerShare).toFixed(2));
        const returnObj = new CalculateObject();
        returnObj.amount = amount;
        returnObj.arr = arr;
        return {
            amount: amount,
            arr: arr,
            policyLifeCycle: policyLifeCycle,
            ownerMoney: ownerMoney
        };
    }


  getIRRByReturn(years, investMoney, returnMoney) {
    const returnPercent = ((returnMoney / investMoney) - 1) * 100;
    const pcPerYear = Math.pow((1 + (returnPercent / 100)), 1 / years) - 1;
    return pcPerYear * 100;
  }

}

export class CalculateObject {
    amount: number;
    arr: InvestCycle[];
    policyLifeCycle: PolicyLifeCycle;
    ownerMoney: number;
}
