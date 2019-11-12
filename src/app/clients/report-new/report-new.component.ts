import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, ViewEncapsulation } from '@angular/core';
import { CalculationService, IssueMapObj, PremiumsMap, Summary } from '../../calculation.service';
import { DialogLeComponent, PremiumsDialogComponent } from '../../single-unit-existing/single-unit-existing.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChartCanvasComponent } from '../report/chart-canvas/chart-canvas.component';
import * as Chart from '../../../../node_modules/chart.js';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-report-new',
  templateUrl: './report-new.component.html',
  styleUrls: ['./report-new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportNewComponent implements OnInit, AfterViewInit {


  onBoardingFees =  {
    legal:        {val:  2000, name: 'Legal'},
    provider:     {val:  3000, name: 'Provider'},
    broker:       {val:  0,    name: 'Broker'},
    pricing:      {val:  1000, name: 'Pricing'},
    underwriting: {val: 1500,  name: 'Underwriting'},
    other:        {val: 0,     name: 'Other'}
  };
  onBoardingFeesSum  = 0;

  ongoingFees =  {
    legal:        {val:  250, name: 'Legal'},
    provider:     {val:  0, name: 'Provider'},
    broker:       {val:  0,    name: 'Broker'},
    pricing:      {val:  250, name: 'Pricing'},
    underwriting: {val: 250,  name: 'Underwriting'},
    tracking:     {val: 250,  name: 'Tracking'},
    other:        {val: 0,     name: 'Other'}
  };
  ongoingFeesSum = 0;

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
  premiums = 30 * 1000;
  premiumsArray = [];
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
  // chart2: Chart;
  // barChartData2;
  // chart3: Chart;
  // barChartData3;
  requestCamera = false;
  mDate;
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

  constructor(public dialog: MatDialog, private http: HttpClient) {
        for (let i = 0; i < this.les.length; i++ ) {
          this.premiumsArray.push(this.premiums);
        }
  }

  ngAfterViewInit() {
    // // alert('after view init');
    this.getOnBoardingFees();
    this.getOngoingFees();
  }

  ngOnInit() {
  }

  getOnBoardingFees() {
    const a = this.onBoardingFees;
    this.onBoardingFeesSum = a.broker.val + a.legal.val + a.other.val + a.pricing.val + a.provider.val + a.underwriting.val;
    return this.onBoardingFeesSum;
  }
  getOngoingFees() {
    const a = this.ongoingFees;
    this.ongoingFeesSum = a.broker.val + a.legal.val + a.other.val + a.pricing.val + a.provider.val + a.underwriting.val + a.tracking.val;
    return this.ongoingFeesSum;
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
    if (! this.reportAsync()) {
      return;
    }
    document.getElementById('loadingContainer').style.display = 'block';
    document.getElementById('section-to-print').style.display = 'none';
    document.getElementById('loadingText').innerHTML = 'Collecting Data';
    setTimeout(() => {
      document.getElementById('loadingText').innerHTML = 'Analyzing';
      setTimeout(() => {
        document.getElementById('loadingText').innerHTML = 'Preparing Report';
        setTimeout(() => {
          document.getElementById('loadingContainer').style.display = 'none';
          document.getElementById('section-to-print').style.display = 'block';
        }, 800);
      }, 800);
    }, 1000 * 1);
  }

  changePremiumArray() {
    const obj = {
      width: '650px',
      data: {
        arr: this.premiumsArray
      }
    };

    const dialogRef = this.dialog.open(PremiumsDialogComponent, obj);
    dialogRef.afterClosed().subscribe(responce => {
      console.log(responce);
      const arr = [];
      for (let index = 0; index < responce.arr.length; index++) {
        const element = responce.arr[index];
        arr.push(parseInt(element.sumDies, 0));
      }
      this.premiumsArray = arr;
      // this.presentValueFace = this.present(arr, sumOfPeople, this.amount);
    });
  }

  reportAsync() {
    // get sum of people
    // generate les if dos'nt exists
    if (this.les === undefined) {
      // alert('Set les please');
      return;
    }
    this.mDate = Date.now();
    // generate premiums if dosn't exists
    const premiumsArray =  JSON.parse(JSON.stringify(this.premiumsArray)); // this.generatePremiumsArray(this.premiums, this.les.length);
    premiumsArray[0] += this.getOnBoardingFees();
    for (let i = 1; i < premiumsArray.length; i++) {
      premiumsArray[i] += this.getOngoingFees();
    }
    let summary;
    let summaryHigh;
    let summaryLow;
    try {
      summary = this.calculationService.calculate(premiumsArray, this.les, this.sumOfPeople, this.irr / 100, this.amount);
      summaryLow = this.calculationService.calculate(premiumsArray, this.les, this.sumOfPeople, (this.irr / 100) + 0.03, this.amount);
      summaryHigh = this.calculationService.calculate(premiumsArray, this.les, this.sumOfPeople, (this.irr / 100) - 0.03, this.amount);
    } catch (err) {
      alert('This policy does not qualify');
      return;
    }

    this.data.lineB.chartA = 1;
    this.data.lineB.chartB = summary.issueObj[2].sellerShares / summary.issueObj[2].totalShares;
    this.data.lineB.chartC = summary.issueObj[6].sellerShares / summary.issueObj[6].totalShares;
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
    return true;
  }

  getTableData(summary: Summary) {
    const data = [
    //   {
    //   title: 'day 1',
    //   enforcedCash: summary.amount,
    //   enforcedPercetage: 100,
    //   solidCash: 0,
    //   solidPercetage: 0,
    //   current: 0
    // }
    ];
    // data[0].current = Math.floor(1 * (summary.issueObj[0].sharePrice * summary.amount));
    let premiumsSum = 0;
    for (let index = 0; index < summary.issueObj.length; index++) {
      const element = summary.issueObj[index];
      const pcListManagment = element.pcForAllInvestors;
      const pcPolicyHolder = 1 - pcListManagment;
      premiumsSum += this.premiumsArray[index];
      const v = {
        title: 'Year ' + (index + 1),
        enforcedCash: this.premiumsArray[index], // Math.floor(element.cashForSeller),
        enforcedPercetage: premiumsSum, // Math.floor((1 - element.pcForAllInvestors) * 100),
        PolicyholderInterest: Math.floor(summary.amount * pcPolicyHolder), // Math.floor(element.cashForInvestors),
        listInterest: Math.floor(summary.amount * pcListManagment),
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
    barChartData.datasets[0].data = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      yearsArray.push(year++);
      barChartData.datasets[0].data.push(element.current);
    }
    barChartData.labels = yearsArray;


    // const barChartData2 = this.barChartData2;
    // const yearsArray2 = [];
    // year = (new Date()).getFullYear();
    // barChartData2.datasets[0].data = [];
    // for (let index = 0; index < array2.length; index++) {
    //   const element = array2[index];
    //   yearsArray2.push(year++);
    //   barChartData2.datasets[0].data.push(element.current);
    // }
    // barChartData2.labels = yearsArray2;

    // // const barChartData3 = this.barChartData3;
    // const yearsArray3 = [];
    // barChartData3.datasets[0].data = [];
    // year = (new Date()).getFullYear();
    // for (let index = 0; index < array3.length; index++) {
    //   const element = array3[index];
    //   yearsArray3.push(year++);
    //   barChartData3.datasets[0].data.push(element.current);
    // }
    // barChartData3.labels = yearsArray3;

    this.chart.update();
    // this.chart2.update();
    // this.chart3.update();
  }

  createCanvasAndData() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    // this.canvas2 = document.getElementById('myChart2');
    // this.ctx2 = this.canvas2.getContext('2d');
    // this.canvas3 = document.getElementById('myChart3');
    // this.ctx3 = this.canvas3.getContext('2d');
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
      // this.barChartData2 = JSON.parse(JSON.stringify(this.barChartData));
      // this.barChartData3 = JSON.parse(JSON.stringify(this.barChartData));
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
          },
          scales: {
            yAxes: [{
              ticks: {
               beginAtZero: true,
               callback: function(value, index, values) {
                 if (value) {
                   return '$' + parseInt(value, 0).toLocaleString();
                 }
               }
              }
            }]
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

  generatePremiumsArrayByLE() {
    if (! this.premiumsArray || this.premiumsArray.length === 0) {
      this.premiumsArray = this.generatePremiumsArray(this.premiums, this.les.length);
    } else if (this.premiumsArray.length === this.les.length) {
      return;
    } else if (this.premiumsArray.length > this.les.length) {
      this.premiumsArray.splice(this.les.length, this.premiumsArray.length);
    } else {
      const val = this.premiumsArray[this.premiumsArray.length - 1];
      for (let i = this.premiumsArray.length; i < this.les.length; i++) {
        this.premiumsArray.push(val);
      }
    }
  }

  onIRRChange() {

  }

  onFaceChange() {

  }

  onPremiumsChange() {
    this.premiumsArray = this.generatePremiumsArray(this.premiums, this.les.length);
  }

  onLEChange() {
    this.les = this.calculationService.getLePerYear(this.le);
    this.generatePremiumsArrayByLE();
    this.sumOfPeople = this.calculationService.getSumFromArray(this.les);
  }

  total(a) {
    return Math.floor(a);
  }

  openCameraDialog() {
    const pwd = Math.floor(Math.random() * 1000000);
    const dialogRef = this.dialog.open(DialogCameraComponent, { data: { pwd: pwd } });
    this.requestCamera = true;
    this.requestCameraFromServer(pwd, dialogRef);
    dialogRef.afterClosed().subscribe(responce => {
      console.log(responce);
      // this.presentValueFace = this.present(arr, sumOfPeople, this.amount);
      this.requestCamera = false;
      this.sendPWDToServer(pwd);
      // alert('close');
    });
  }

  openOngoingDialog() {
    const dialogRef = this.dialog.open(DialogOnboardingComponent, { data: {arr: this.ongoingFees, title: 'Annual Ongoing Fees' }});
    dialogRef.afterClosed().subscribe(responce => {
      console.log(responce);
      if (responce != null) {
        this.ongoingFees = responce.arr;
        this.getOngoingFees();
      }
    });

  }

  openOnboardingDialog() {
    const dialogRef = this.dialog.open(DialogOnboardingComponent, { data: {arr: this.onBoardingFees, title: 'Onboarding Fees'}});
    dialogRef.afterClosed().subscribe(responce => {
      console.log(responce);
      if (responce != null) {
        this.onBoardingFees = responce.arr;
        this.getOnBoardingFees();
      }
    });

  }

  requestCameraFromServer(pwd, d: MatDialogRef<DialogCameraComponent>) {
    if (this.requestCamera) {
      setTimeout(() => {
        if (!this.requestCamera) {
          return;
        }
        this.http.get('https://my-server-demo.herokuapp.com/check/?pwd=' + pwd).subscribe(data => {
          // alert(data);
          d.close();
        }, error => {
          console.log(error);
          this.requestCameraFromServer(pwd, d);
        });
      }, 1000 * 3);
    }
  }

  sendPWDToServer(pwd) {
    this.http.get('https://my-server-demo.herokuapp.com/?pwd=' + pwd).subscribe(data => {
      // alert(data);
      this.amount = 1000 * 750;
      this.le = 6;
      this.premiums = 6750;
    }, error => {
      console.log(error);
    });
  }
}


@Component({
  selector: '../report/app-camera-dialog',
  templateUrl: '../report/camera-dialog.html',
})
export class DialogCameraComponent implements OnInit {

  pwd;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogCameraComponent>) {
  }

  ngOnInit() {
    console.log(this.data);
    this.pwd = this.data.pwd;
  }
  onNoClick(): void {
    // this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
  addYear() {
    // this.myObj.push({sumDies: ''});
  }
  done() {
    this.dialogRef.close();
  }
  goHome() {

  }
}


@Component({
  selector: '../report/app-ongoing-dialog',
  templateUrl: '../report/att-ongoing-dialog.html',
})
export class DialogOngoingComponent implements OnInit {

  myObj = [{sumDies: ''}];
  title = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogLeComponent>) { }

  ngOnInit() {
    console.log(this.data);
    this.title = this.data.title;
    const arr = this.data ? this.data.arr : [53, 70, 83, 91, 93, 96, 94, 87, 80, 74, 62, 48, 33, 20, 10, 4, 2];
    this.myObj[0].sumDies = '' + arr[0];
    for (let index = 1; index < arr.length; index++) {
      const element = arr[index];
      this.myObj.push({sumDies: '' + element});
    }
  }
  onNoClick(): void {
    // this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
  addYear() {
    this.myObj.push({sumDies: ''});
  }
  done() {
    this.dialogRef.close({arr: this.myObj});
  }
}


@Component({
  selector: '../report/app-onboarding-dialog',
  templateUrl: '../report/att-onboarding-dialog.html',
})
export class DialogOnboardingComponent implements OnInit {
  objectKeys = Object.keys;
  myObj = {};
  title = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogLeComponent>) { }

  ngOnInit() {
    this.myObj = this.data.arr;
    this.title = this.data.title;
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  close() {
    this.dialogRef.close({arr: this.myObj});
  }
  addYear() {
    // this.myObj.push({sumDies: ''});
  }
  done() {
    this.dialogRef.close({arr: this.myObj});
  }
}