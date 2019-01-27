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
  les = [53, 70, 83, 91, 93, 96, 94, 87, 80, 74, 62, 48, 33, 20, 10, 4, 2];
  premiums = 15 * 1000;
  totalPremiums = 0;
  discount = 0;
  presentValueFace = 0;
  presentValueInvestor = 0;
  checkSeller = 0;
  premiumDiscount = 7;
  isHidden = true;
  sumOfPeople = 1000;
  calculationService = new CalculationService();
  chart: Chart;
  barChartData;
  chart2: Chart;
  barChartData2;
  chart3: Chart;
  barChartData3;
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
  canvas2: any;
  ctx2: any;
  canvas3: any;
  ctx3: any;

  constructor(public dialog: MatDialog) { }

  ngAfterViewInit() {
    // alert('after view init');
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
    // this.isHidden = false;
    // setTimeout(() => {this.reportAsync(); }, 3000);
    this.reportAsync();
    document.getElementById('section-to-print').style.display = 'block';
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
    this.datin = this.getTableData(summary);
    this.highData = this.getTableData(summaryHigh);
    this.lowData = this.getTableData(summaryLow);

    this.setIlustration(this.highData, this.datin, this.lowData);
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
    data[0].current = Math.floor(0.9 * (summary.issueObj[0].sharePrice * summary.amount));
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

  setIlustration(array, array2, array3) {
    this.createCanvasAndData();
    let year = (new Date()).getFullYear();
    const barChartData = this.barChartData;
    const yearsArray = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      yearsArray.push(year++);
      barChartData.datasets[0].data.push(element.current);
    }
    barChartData.labels = yearsArray;


    const barChartData2 = this.barChartData2;
    const yearsArray2 = [];
    year = (new Date()).getFullYear();
    for (let index = 0; index < array2.length; index++) {
      const element = array2[index];
      yearsArray2.push(year++);
      barChartData2.datasets[0].data.push(element.current);
    }
    barChartData2.labels = yearsArray2;

    const barChartData3 = this.barChartData3;
    const yearsArray3 = [];
    year = (new Date()).getFullYear();
    for (let index = 0; index < array3.length; index++) {
      const element = array3[index];
      yearsArray3.push(year++);
      barChartData3.datasets[0].data.push(element.current);
    }
    barChartData3.labels = yearsArray3;

    this.chart.update();
    this.chart2.update();
    this.chart3.update();
  }

  createCanvasAndData() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.canvas2 = document.getElementById('myChart2');
    this.ctx2 = this.canvas2.getContext('2d');
    this.canvas3 = document.getElementById('myChart3');
    this.ctx3 = this.canvas3.getContext('2d');
    if (this.barChartData === undefined) {
        this.barChartData = {
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
      this.barChartData2 = JSON.parse(JSON.stringify(this.barChartData));
      this.barChartData3 = JSON.parse(JSON.stringify(this.barChartData));
    }

    if (this.chart === undefined) {
      this.chart = new Chart(this.ctx, {
        type: 'bar',
        data: this.barChartData,
        options: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        }

      });
      this.chart2 = new Chart(this.ctx2, {
        type: 'bar',
        data: this.barChartData2,
        options: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        }

      });
      this.chart3 = new Chart(this.ctx3, {
        type: 'bar',
        data: this.barChartData3,
        options: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          }
        }

      });
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
    this.sumOfPeople = this.calculationService.getSumFromArray(this.les);
  }

  total(a) {
    return Math.floor(a);
  }
}
