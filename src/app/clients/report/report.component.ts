import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CalculationService, IssueMapObj, PremiumsMap, Summary } from '../../calculation.service';
import { DialogLeComponent } from '../../single-unit-existing/single-unit-existing.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChartCanvasComponent } from './chart-canvas/chart-canvas.component';
import * as Chart from '../../../../node_modules/chart.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewInit {


  datin = [{
    title: 'day 1',
    enforcedCash: 10000,
    enforcedPercetage: 10000,
    solidCash: 10000,
    solidPercetage: 10000,
    current: 10000
  },
  {
    title: 'Year 1',
    enforcedCash: 10000,
    enforcedPercetage: 10000,
    solidCash: 10000,
    solidPercetage: 10000,
    current: 10000
  },
  {
    title: 'Year 2',
    enforcedCash: 10000,
    enforcedPercetage: 10000,
    solidCash: 10000,
    solidPercetage: 10000,
    current: 10000
  },
  {
    title: 'Year 3',
    enforcedCash: 10000,
    enforcedPercetage: 10000,
    solidCash: 10000,
    solidPercetage: 10000,
    current: 10000
  },
  {
    title: 'Year 4',
    enforcedCash: 10000,
    enforcedPercetage: 10000,
    solidCash: 10000,
    solidPercetage: 10000,
    current: 10000
  },
  {
    title: 'Year 5',
    enforcedCash: 10000,
    enforcedPercetage: 10000,
    solidCash: 10000,
    solidPercetage: 10000,
    current: 10000
  }];

  highData;
  lowData;
  amount = 1000 * 1000;
  irr = 15;
  le = 7;
  les = undefined;
  premiums = 30 * 1000;
  totalPremiums = 0;
  discount = 0;
  presentValueFace = 0;
  presentValueInvestor = 0;
  checkSeller = 0;
  premiumDiscount = 7;
  isHidden = true;
  sumOfPeople = 0;
  calculationService = new CalculationService();
  chart: Chart;
  barChartData;
  data = {
    lineA: {
      chartA: 1,
      chartB: 1,
      chartC: 1
    },
    lineB: {
      chartA: 1,
      chartB: 1,
      chartC: 1
    },
    lineC: {
      chartA: 1,
      chartB: 1,
      chartC: 1
    }
  };

  @ViewChild('chart') child11: ChartCanvasComponent;
  // @ViewChild('chart12') child12: ChartCanvasComponent;
  // @ViewChild('chart13') child13: ChartCanvasComponent;
  // @ViewChild('chart21') child21: ChartCanvasComponent;
  // @ViewChild('chart22') child22: ChartCanvasComponent;
  // @ViewChild('chart23') child23: ChartCanvasComponent;
  // @ViewChild('chart31') child31: ChartCanvasComponent;
  // @ViewChild('chart32') child32: ChartCanvasComponent;
  // @ViewChild('chart33') child33: ChartCanvasComponent;

  canvas: any;
  ctx: any;

  constructor(public dialog: MatDialog) { }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }


  openLeDialog() {
    const obj = {
      width: '650px',
      data: undefined
    };
    if (this.les) {
      obj.data = {
        arr: this.les
      };
    } else {
      delete obj.data;
    }
    const dialogRef = this.dialog.open(DialogLeComponent, obj);
    dialogRef.afterClosed().subscribe(responce => {
      console.log(responce);
      const arr = [];
      let sumOfPeople = 0;
      for (let index = 0; index < responce.arr.length; index++) {
        const element = responce.arr[index];
        sumOfPeople += parseInt(element.sumDies, 0);
        arr.push(parseInt(element.sumDies, 0));
      }
      this.sumOfPeople = sumOfPeople;
      this.les = arr;
      // this.presentValueFace = this.present(arr, sumOfPeople, this.amount);
    });

  }
  report() {
    this.isHidden = false;
    setTimeout(this.reportAsync);
  }
  reportAsync() {
    // get sum of people
    // generate les if dos'nt exists
    if (this.les === undefined) {
      alert('Set les please');
      return;
    }
    // generate premiums if dosn't exists
    const premiumsArray = this.generatePremiumsArray(this.premiums, this.les.length);
    const summary = this.calculationService.calculate(premiumsArray, this.les, this.sumOfPeople, this.irr / 100, this.amount);

    this.data.lineB.chartA = 1;
    this.data.lineB.chartB = summary.issueObj[2].sellerShares / summary.issueObj[2].totalShares;
    this.data.lineB.chartC = summary.issueObj[6].sellerShares / summary.issueObj[6].totalShares;
    const summaryLow = this.calculationService.calculate(premiumsArray, this.les, this.sumOfPeople, (this.irr / 100) + 0.03, this.amount);
    const summaryHigh = this.calculationService.calculate(premiumsArray, this.les, this.sumOfPeople, (this.irr / 100) - 0.03, this.amount);
    this.data.lineA.chartA = 1;
    this.data.lineA.chartB = summaryHigh.issueObj[2].sellerShares / summaryHigh.issueObj[2].totalShares;
    this.data.lineA.chartC = summaryHigh.issueObj[6].sellerShares / summaryHigh.issueObj[6].totalShares;
    this.data.lineC.chartA = 1;
    this.data.lineC.chartB = summaryLow.issueObj[2].sellerShares / summaryLow.issueObj[2].totalShares;
    this.data.lineC.chartC = summaryLow.issueObj[6].sellerShares / summaryLow.issueObj[6].totalShares;
    console.log(summary);
    console.log(summaryHigh);
    console.log(summaryLow);
    this.setIlustration(premiumsArray);
    this.datin = this.getTableData(summary);
    this.highData = this.getTableData(summaryHigh);
    this.lowData = this.getTableData(summaryLow);
  }

  getTableData(summary: Summary) {
    const data = [{
      title: 'day 1',
      enforcedCash: summary.amount,
      enforcedPercetage: 100,
      solidCash: 0,
      solidPercetage: 0,
      current: 0
    }];
    for (let index = 0; index < summary.issueObj.length; index++) {
      const element = summary.issueObj[index];
      const v = {
        title: 'Year ' + (index + 1),
        enforcedCash: Math.floor(element.cashForSeller),
        enforcedPercetage: Math.floor((1 - element.pcForAllInvestors) * 100),
        solidCash: Math.floor(element.cashForInvestors),
        solidPercetage: Math.floor(element.pcForAllInvestors * 100),
        current: 0
      };
      v.current = Math.floor(element.sharePrice * element.sellerShares);
      data.push(v);
    }
    return data;
  }

  setIlustration(premiumsArray) {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let year = (new Date()).getFullYear();
    let barChartData;
    if (this.barChartData !== undefined) {
      barChartData = this.barChartData;
    } else {
      barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          backgroundColor: '#00AEEf',
          borderColor: '#00AEEf',
          borderWidth: 1,
          data: []
        }],
        options: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        }
      };
      this.barChartData = barChartData;
    }

    const yearsArray = [];
    for (let index = 0; index < premiumsArray.length; index++) {
      const element = premiumsArray[index];
      yearsArray.push(year++);
      barChartData.datasets[0].data.push(element / 1000);
    }
    barChartData.labels = yearsArray;

    if (this.chart === undefined) {
      const myChart = new Chart(this.ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        }

      });
      this.chart = myChart;
    } else {
      this.chart.update();
    }
  }
  generatePremiumsArray(onePremium: number, years): number[] {
    const mArray = [];
    for (let i = 0; i < years; i++) {
      mArray.push(onePremium);
    }
    return mArray;
  }

  onIRRChange() {

  }

  onFaceChange() {

  }

  onPremiumsChange() {

  }

  onLEChange() {
    this.les = this.calculationService.getLePerYear(this.le);
  }

  total(a) {
    return Math.floor(a);
  }
}
