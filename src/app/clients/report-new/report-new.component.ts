import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, ViewEncapsulation } from '@angular/core';
import { CalculationService, IssueMapObj, PremiumsMap, Summary } from '../../calculation.service';
import { DialogLeComponent, PremiumsDialogComponent } from '../../single-unit-existing/single-unit-existing.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChartCanvasComponent } from '../report/chart-canvas/chart-canvas.component';
import * as Chart from '../../../../node_modules/chart.js';
import { HttpClient } from '@angular/common/http';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report-new',
  templateUrl: './report-new.component.html',
  styleUrls: ['./report-new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportNewComponent implements OnInit, AfterViewInit {

  davis =  {
    number: 157209409,
    name: 'J.D',
    age: 96,
    face: 1300 * 1000,
    discount: 13,
  };

  example = {
    number: '----------',
    name: 'Example',
    age: 85,
    face: 1000 * 1000,
    discount: 13,
  };
  ownerName = 'E.L.S';
  policyNumber = 'G1627804'; // '7053265'; //
  age = 98;
  amount = 3500000;
  irr = 13;
  headerFields = this.davis;


  @ViewChild('header1') myDiv: ElementRef;
  @ViewChild('mImg') myImg: ElementRef;
  imgPath = '';
  imgPath2 = '';
  csvData: Object;
  csvYear;
  csvMonth;
  param1: number;
  param2: number;
  param3: number;
  param4: number;
  param5: number;
  param6: number;
  param7: number;
  param8: number;
  pdf = true;
  expences = [];
  monthData = [];
  lesAvg = [6.42, 6.36, 6.31, 6.25, 6.20, 6.14, 6.08, 6.03, 5.97, 5.92, 5.86, 5.80, 5.75, 5.70, 5.65, 5.60, 5.55, 5.50, 5.46, 5.41, 5.36, 5.31, 5.26, 5.21, 5.16, 5.12, 5.08, 5.03, 4.99, 4.95, 4.90, 4.86, 4.82, 4.77, 4.73, 4.69, 4.64, 4.61, 4.57, 4.53, 4.49, 4.45, 4.41, 4.37, 4.33, 4.29, 4.25, 4.21, 4.18, 4.14, 4.10, 4.06, 4.03, 3.99, 3.95, 3.91, 3.88, 3.84, 3.80, 3.77, 3.73, 3.70, 3.66, 3.63, 3.59, 3.56, 3.52, 3.49, 3.46, 3.42, 3.39, 3.36, 3.33, 3.29, 3.26, 3.23, 3.19, 3.16, 3.13, 3.10, 3.07, 3.04, 3.01, 2.98, 2.95, 2.92, 2.88, 2.85, 2.82, 2.79, 2.76, 2.72, 2.69, 2.66, 2.64, 2.61, 2.58, 2.55, 2.51, 2.48, 2.45, 2.42, 2.39, 2.36, 2.33, 2.30, 2.27, 2.25, 2.22, 2.19, 2.16, 2.13, 2.11, 2.08, 2.05, 2.03, 2.00, 1.98, 1.96, 1.94, 1.92, 1.89, 1.86, 1.83, 1.81, 1.78, 1.76, 1.73, 1.71, 1.69, 1.67, 1.66, 1.64, 1.62, 1.59, 1.56, 1.54, 1.52, 1.49, 1.47, 1.46, 1.44, 1.43, 1.42, 1.41, 1.38, 1.36, 1.33, 1.31, 1.28, 1.26, 1.24, 1.23, 1.22, 1.21, 1.21, 1.21, 1.18, 1.15, 1.13, 1.10, 1.08, 1.06, 1.04, 1.03, 1.02, 1.02, 1.03, 1.04, 1.01, 0.98, 0.95, 0.93, 0.90, 0.88, 0.86, 0.85, 0.84, 0.84, 0.85, 0.87, 0.84, 0.80, 0.77, 0.73, 0.70, 0.67, 0.64, 0.61, 0.58, 0.56, 0.55, 0.54, 0.50, 0.46, 0.42, 0.37, 0.33, 0.29, 0.25, 0.21, 0.17, 0.12, 0.08];
  isPremiumsPerMonth = false;
  isDeadPerMonth = false;

  onBoardingFees = {
    legal: { val: 7500, name: 'Legal' },
    provider: { val: 0, name: 'Provider' },
    broker: { val: 0, name: 'Broker' },
    pricing: { val: 500, name: 'Pricing' },
    underwriting: { val: 0, name: 'Underwriting' },
    trustservice: { val: 2000, name: 'Trust Service' },
    tracking: { val: 0, name: 'Tracking' },
    other: { val: 0, name: 'Other' }
  };
  onBoardingFeesSum = 0;

  ongoingFees = {
    legal: { val: 600, name: 'Legal' },
    provider: { val: 0, name: 'Provider' },
    broker: { val: 0, name: 'Broker' },
    pricing: { val: 0, name: 'Pricing' },
    underwriting: { val: 0, name: 'Underwriting' },
    trustservice: { val: 600, name: 'Trust Service' },
    tracking: { val: 1200, name: 'Tracking' },
    other: { val: 0, name: 'Other' }
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
  le = 7.0;
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
  listFee = 5;
  listFeeCash = 0;
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
    for (let i = 0; i < this.les.length; i++) {
      this.premiumsArray.push(this.premiums);
    }

    if (this.headerFields) {
      this.amount = this.headerFields.face;
      this.age = this.headerFields.age;
      this.ownerName = this.headerFields.name;
      this.irr = this.headerFields.discount;
      this.policyNumber = '' + this.headerFields.number;
    }
  }

  ngAfterViewInit() {
    // // alert('after view init');
    this.getOnBoardingFees();
    this.getOngoingFees();
  }

  ngOnInit() {
  }
  onListFeeChange () {
    // alert('cganged');
    if (this.listFee > 0 && this.amount > 0 ) {
      this.listFeeCash = Math.round(this.amount * (this.listFee / 100));
    }
  }

  fileUpload(event) {
    const file: File = event.target.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = ((e) => {
      // you can perform an action with readed data here
      // console.log(myReader.result);
      this.csvJSON(myReader.result);
    });

    myReader.readAsText(file);
  }
  fileUploadData(event) {
    const file: File = event.target.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = ((e) => {
      // you can perform an action with readed data here
      // console.log(myReader.result);
      this.csvData =  this.csvJSON(myReader.result);
    });

    myReader.readAsText(file);
  }
  fileUploadYear(event) {
    const file: File = event.target.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = ((e) => {
      // you can perform an action with readed data here
      // console.log(myReader.result);
      this.csvYear =  this.csvJSON2(myReader.result);
      console.log(this.csvYear);
    });

    myReader.readAsText(file);
  }
  fileUploadMonth(event) {
    const file: File = event.target.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = ((e) => {
      // you can perform an action with readed data here
      // console.log(myReader.result);
      this.csvMonth =  this.csvJSON2(myReader.result);
      for (let index = 0; index < this.csvMonth.length; index++) {
        const element = this.csvMonth[index];
        if ( element.OGExpenses) {
          element.OGExpenses = parseInt(element.OGExpenses, 0);
          if (element.OBExpenses) {
            element.OGExpenses += parseInt(element.OBExpenses, 0);
          }
        }
      }
      console.log(this.csvMonth);
    });

    myReader.readAsText(file);
  }


  CSVToArray( strData, strDelimiter ) {
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ',');

        // Create a regular expression to parse the CSV values.
        const objPattern = new RegExp(
            (
                // Delimiters.
                '(\\' + strDelimiter + '|\\r?\\n|\\r|^)' +

                // Quoted fields.
                '(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|' +

                // Standard fields.
                '([^\"\\" + strDelimiter + "\\r\\n]*))'
            ),
            'gi'
            );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        const arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        let arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )) {

            // Get the delimiter that was found.
            const strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
                ) {

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );

            }

            let strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]) {

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( '\"\"', 'g' ),
                    '\"'
                    );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }

        // Return the parsed data.
        return( arrData );
    }
    parseCSV(str) {
    const arr = [];
    let quote = false;  // true means we're inside a quoted field

    // iterate over each character, keep track of current row and column (of the returned array)
    for (let row = 0, col = 0, c = 0; c < str.length; c++) {
        const cc = str[c], nc = str[c + 1];        // current character, next character
        arr[row] = arr[row] || [];             // create a new row if necessary
        arr[row][col] = arr[row][col] || '';   // create a new column (start with empty string) if necessary

        // If the current character is a quotation mark, and we're inside a
        // quoted field, and the next character is also a quotation mark,
        // add a quotation mark to the current column and skip the next character
        if (cc === '"' && quote && nc === '"') { arr[row][col] += cc; ++c; continue; }  

        // If it's just one quotation mark, begin/end quoted field
        if (cc === '"') { quote = !quote; continue; }

        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc === ',' && !quote) { ++col; continue; }

        // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
        // and move on to the next row and move to column 0 of that new row
        if (cc === '\r' && nc === '\n' && !quote) { ++row; col = 0; ++c; continue; }

        // If it's a newline (LF or CR) and we're not in a quoted field,
        // move on to the next row and move to column 0 of that new row
        if (cc === '\n' && !quote) { ++row; col = 0; continue; }
        if (cc === '\r' && !quote) { ++row; col = 0; continue; }

        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
    }
    return arr;
}


  csvJSON2(csv) {
    console.log(csv);
    const lines = this.parseCSV(csv);
    console.log(lines);

    const result = [];

    const headers = lines[0];

    for (let i = 1; i < lines.length; i++) {

      const obj = {};
      const currentline = lines[i];
      for (let j = 0; j < headers.length; j++) {
        if (currentline[j]) {
          obj[headers[j]] = currentline[j].trim();
        }
      }

      result.push(obj);

    }
    return result;
  }

  csvJSON(csv) {

    const lines = csv.split('\n');

    const result = [];

    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {

      const obj = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

    }

    const tempLes = [];
    const tempPremiums = [];
    const leTable = [];

    this.amount = result[0].faceValue;
    result.map((e) => {
      if (e.lePerMonth) {
        tempLes.push(parseFloat(e.lePerMonth));
      }
      if (e.premiumsPerMonth) {
        tempPremiums.push(parseFloat(e.premiumsPerMonth));
      }

      this.les = tempLes;
      this.premiumsArray = tempPremiums;

      this.isDeadPerMonth = true;
      this.isPremiumsPerMonth = true;
      this.premiums = tempPremiums[0].toFixed(2);
      this.le = parseFloat(this.les[0].toFixed(2)); // parseFloat(new Calc().getLeAvg(this.les).toFixed(2));
      return undefined;
    });
    // console.log(result);
    // return result; //JavaScript object
    return JSON.stringify(result); // JSON
  }


  getOnBoardingFees() {
    const a = this.onBoardingFees;
    this.onBoardingFeesSum = a.broker.val + a.legal.val + a.other.val + a.pricing.val +
      a.provider.val + a.underwriting.val + a.trustservice.val + a.tracking.val;
    return this.onBoardingFeesSum;
  }
  getOngoingFees() {
    const a = this.ongoingFees;
    this.ongoingFeesSum = a.broker.val + a.legal.val + a.other.val +
      a.pricing.val + a.provider.val + a.underwriting.val + a.tracking.val + a.trustservice.val;
    return this.ongoingFeesSum;
  }


  openLeDialog() {
    const obj = {
      width: '650px',
      height: '80vh',
      data: undefined
    };
    if (this.les) {
      obj.data = {
        arr: this.les,
        isMonth: this.isDeadPerMonth
      };
    } else {
      delete obj.data;
    }
    const dialogRef = this.dialog.open(DialogLeComponent, obj);
    dialogRef.afterClosed().subscribe(responce => {
      // console.log(responce);
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
     setTimeout(() => {
              this.datin = this.csvYear;
              this.monthData = this.csvMonth;
              const arr = [];
              let counter = 0;
              for (; counter < this.csvMonth.length;) {
                const mArr = [];
                for (let m = 1; m <= 12 && counter < this.csvMonth.length; m++) {
                  mArr.push(this.csvMonth[counter++]);
                }
                arr.push(mArr);
              }
              this.monthData = arr;

    }, 10 * 1000);


    // this.isHidden = false;
    // setTimeout(() => {this.reportAsync(); }, 3000);
    // this.http.get('/assets/temp/davis/dilution_month.json', {responseType: 'text'})
    // .subscribe(
    //     data => {
    //         console.log(data);
    //         const a = this.monthData;
    //         setTimeout(() => {
    //           const arr = [];
    //           const monthArray = JSON.parse(data);
    //           let counter = 0;
    //           for (; counter < monthArray.length;) {
    //             const mArr = [];
    //             for (let m = 1; m <= 12 && counter < monthArray.length; m++) {
    //               mArr.push(monthArray[counter++]);
    //             }
    //             arr.push(mArr);
    //           }
    //           this.monthData = arr;
    //         }, 10 * 1000);
    //     },
    //     error => {
    //         console.log(error);
    //     }
    // );

    //     this.http.get('/assets/temp/davis/dilution_year.json', {responseType: 'text'})
    // .subscribe(
    //     data => {
    //         console.log(data);
    //         setTimeout(() => {
    //           this.datin = JSON.parse(data);
    //         }, 10 * 1000);
    //     },
    //     error => {
    //         console.log(error);
    //     }
    // );


    if (!this.reportAsync()) {
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
          document.getElementById('downloadImage').style.display = 'block';
          document.getElementById('downloadImage').style.opacity = '1';
        }, 800);
      }, 800);
    }, 1000 * 1);
  }

  changePremiumArray() {
    const obj = {
      width: '650px',
      height: '80vh',
      data: {
        arr: this.premiumsArray,
        isMonth: this.isPremiumsPerMonth
      }
    };

    const dialogRef = this.dialog.open(PremiumsDialogComponent, obj);
    dialogRef.afterClosed().subscribe(responce => {
      // console.log(responce);
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
        if (this.listFee > 0 && this.amount > 0 ) {
      this.listFeeCash = Math.round(this.amount * (this.listFee / 100));
    }

    if (this.les === undefined) {
      // alert('Set les please');
      return;
    }

    if (this.les) {
      const data = [];

      this.mDate = Date.now();
      let leMonth;
      let pm = [];
      if (this.isDeadPerMonth) {
        leMonth = this.les;
        pm = this.premiumsArray;
      } else {
        leMonth = this.lesAvg;
        pm = [];
        for (let year = 0; year < this.les.length; year++) {
          for (let i = 0; i < 12; i++) {
            leMonth.push(this.les[year] / 12);
          }
        }
        for (let year = 0; year < this.premiumsArray.length; year++) {
          for (let i = 0; i < 12; i++) {
            pm.push(this.premiumsArray[year] / 12);
          }
        }

      }
      const sumObj = new Calc().calculate(this.amount, leMonth, pm, this.irr, this.onBoardingFeesSum, this.ongoingFeesSum);
      let total = 0;
      let counter2 = 0;
      for (let index = 0; index < sumObj.perYear.length; index++) {
        const element = sumObj.perYear[index];
        const pcListManagment = element.pcForInvestors;
        const pcPolicyHolder = (1 - pcListManagment);
        total += element.onboarding + element.ongoing + element.premiums;
        const v = {
          title: (index + 1),
          enforcedCash: element.premiums || 0, // Math.floor(element.cashForSeller),
          expenses: Math.round(element.onboarding + element.ongoing),
          enforcedPercetage: element.pcForInvestors, // Math.floor((1 - element.pcForAllInvestors) * 100),
          pcForSeller: (Math.round(pcPolicyHolder * 1000) / 10).toFixed(1),
          pcForInvesrors: (Math.round(pcListManagment * 1000) / 10).toFixed(1),
          PolicyholderInterest:
            (Math.round((sumObj.faceValue * pcPolicyHolder))), // Math.floor(element.cashForInvestors),
          listInterest:
            (Math.round(sumObj.faceValue * pcListManagment)),
          total: Math.round(total),
          current: 0
        };
        // v.current = Math.floor(element.sharePrice * element.sellerShares);
        data.push(v);
        if (!element.premiums) {
          counter2++;
          if (counter2 >= 2) {
            break;
          }
        }

      }
      this.datin = data;

      const data2 = [];
      total = 0;
      counter2 = 0;
      for (let i = 0; i < sumObj.perYear.length && counter2 < 4; i++) {
        const element1 = sumObj.perYear[i];
        const data3 = [];
        for (let index = 0; index < element1.month.length && counter2 < 4; index++) {
          const element = element1.month[index];
          const pcListManagment = element.pcForInvestors;
          const pcPolicyHolder = 1 - pcListManagment;
          total += element.onboarding + element.ongoing + element.premiums;
          const v = {
            title: (index + 1),
            expenses: Math.round(element.onboarding + element.ongoing),
            enforcedCash: element.premiums || 0, // Math.floor(element.cashForSeller),
            enforcedPercetage: element.pcForInvestors, // Math.floor((1 - element.pcForAllInvestors) * 100),

            pcForSeller: (Math.round(pcPolicyHolder * 1000) / 10).toFixed(1),
            pcForInvesrors: (Math.round(pcListManagment * 1000) / 10).toFixed(1),
            PolicyholderInterest:
              (Math.round((sumObj.faceValue * pcPolicyHolder))), // Math.floor(element.cashForInvestors),
            listInterest:
              (Math.round(sumObj.faceValue * pcListManagment)),

            current: 0,
            total: Math.round(total)
          };
          if (!element.premiums) {
            counter2++;
            if (counter2 > 4) {
              break;
            }
          }

          data3.push(v);
        }
        // v.current = Math.floor(element.sharePrice * element.sellerShares);
        data2.push(data3);
      }
      this.monthData = data2;
      this.expences = [
        { title: 'Broker', onboarding: this.onBoardingFees.broker.val || 0, ongoing: this.ongoingFees.broker.val || 0 },
        { title: 'Provider', onboarding: this.onBoardingFees.provider.val || 0, ongoing: this.ongoingFees.provider.val || 0 },
        { title: 'Legal', onboarding: this.onBoardingFees.legal.val || 0, ongoing: this.ongoingFees.legal.val || 0 },
        { title: 'Premium Pricing', onboarding: this.onBoardingFees.pricing.val || 0, ongoing: this.ongoingFees.pricing.val || 0 },
        { title: 'LE Underwriting', onboarding: this.onBoardingFees.underwriting.val || 0, ongoing: this.ongoingFees.underwriting.val || 0 },
        { title: 'Trust Service', onboarding: this.onBoardingFees.trustservice.val || 0, ongoing: this.ongoingFees.trustservice.val || 0 },
        { title: 'Servicing', onboarding: this.onBoardingFees.tracking.val || 0, ongoing: this.ongoingFees.tracking.val || 0 },
        { title: 'Other', onboarding: this.onBoardingFees.other.val || 0, ongoing: this.ongoingFees.other.val || 0 },
        { title: 'Total', onboarding: this.onBoardingFeesSum, ongoing: this.ongoingFeesSum }
      ];
      return true;
    }


    this.mDate = Date.now();
    // generate premiums if dosn't exists
    const premiumsArray = JSON.parse(JSON.stringify(this.premiumsArray)); // this.generatePremiumsArray(this.premiums, this.les.length);
    const month = premiumsArray.length * 12;

    const premiumsMonth = [];
    for (let i = 0; i < premiumsArray.length; i++) {
      for (let j = 0; j < 12; j++) {
        premiumsMonth.push(premiumsArray[i] / 12);
      }
    }

    const lesMonth = [];
    for (let i = 0; i < premiumsArray.length; i++) {
      for (let j = 0; j < 12; j++) {
        lesMonth.push(this.les[i] / 12);
      }
    }

    premiumsArray[0] += this.getOnBoardingFees();
    for (let i = 1; i < premiumsArray.length; i++) {
      premiumsArray[i] += this.getOngoingFees();
    }
    let summary;
    let summaryHigh;
    let summaryLow;
    try {
      // summary = this.calculationService.calculate(premiumsArray, this.les, this.sumOfPeople, this.irr / 100, this.amount);
      const partIrr = Math.pow((1 + (this.irr / 100)), (1 / 12)) - 1;
      // alert(partIrr);
      summary = this.calculationService.calculate(premiumsMonth, lesMonth, this.sumOfPeople, partIrr, this.amount);
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

    // this.setIlustration(this.highData, this.datin, this.lowData);
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
      premiumsSum += this.premiumsArray[index] + this.ongoingFeesSum;
      const v = {
        title: 'Year ' + (index + 1),
        enforcedCash: this.premiumsArray[index], // Math.floor(element.cashForSeller),
        enforcedPercetage: premiumsSum, // Math.floor((1 - element.pcForAllInvestors) * 100),
        pcForSeller: Math.floor((pcPolicyHolder) * 100),
        pcForInvesrors: Math.floor((pcListManagment) * 100),
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
    // this.createCanvasAndData();
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
                callback: function (value, index, values) {
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
    if (!this.premiumsArray || this.premiumsArray.length === 0) {
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

  download() {
    // document.getElementById('downloadImage').classList.add('anim');
    const elem = this.myDiv.nativeElement;
    html2canvas(this.myDiv.nativeElement).then(canvas => {
      const doc = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 208;
      const pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      let contentDataURL = canvas.toDataURL('image/png');
      let position = 10;
      doc.addImage(contentDataURL, 'JPEG', 10, position, imgWidth - 20, imgHeight - 10, '', 'FAST');
      position += imgHeight + 5;
      doc.setFontSize(14);
      doc.setFontType('bold');
      doc.text(15, position, 'Schedule Summary - Annually');
      doc.setDrawColor(0, 0, 0);
      position += 1;
      doc.line(14, position, 90, position);
      position += 5;

      doc.autoTable({
        html: '#table2', startY: position + 5, useCss: true,
        didDrawPage: function (data) {
          // if (data.pageNumber > 1) {
          //   // Header
          //   doc.setFontSize(10);
          //   doc.setTextColor(40);
          //   doc.setFontStyle('normal');
          //   doc.text('Report', 15, 5);
          // }
        },
      });

      position = Math.abs(doc.lastAutoTable.finalY) + 20;

      const descriptionHeight = 120 * (imgWidth / canvas.width);
      const desc = window.document.getElementById('tableDescription');
      html2canvas(desc).then(canvas2 => {
        contentDataURL = canvas2.toDataURL('image/png');
        imgHeight = canvas2.height * imgWidth / canvas.width;
        if (position > pageHeight - (imgHeight + 20)) {
          doc.addPage();
          doc.setPage(doc.getNumberOfPages());
          position = 20;
        }


        doc.addImage(contentDataURL, 'JPEG', 10, position, imgWidth - 20, imgHeight - 5, '', 'FAST');
        position += imgHeight + 10;

        const element3 = window.document.getElementById('disclaimer');
        html2canvas(element3).then(canvas3 => {
          contentDataURL = canvas3.toDataURL('image/png');
          imgHeight = canvas3.height * imgWidth / canvas.width;
          if (position > pageHeight - (imgHeight + 20)) {
            doc.addPage();
            doc.setPage(doc.getNumberOfPages());
            position = 20;
          }
          doc.addImage(contentDataURL, 'JPEG', 10, position, imgWidth - 20, imgHeight - 5, '', 'FAST');
          position += imgHeight + 10;

          if (position > pageHeight - 20) {
            doc.addPage();
            doc.setPage(doc.getNumberOfPages());
            position = 20;
          }


          doc.setFontSize(14);
          doc.setFontType('bold');
          doc.text(15, position, 'Detailed Schedule – Monthly');
          doc.setDrawColor(0, 0, 0);
          position += 1;
          doc.line(14, position, 85, position);
          position += 10;

          const tableArrays = window.document.getElementsByClassName('tableMonth');
          for (let i = 0; i < tableArrays.length; i++) {
            if (position > pageHeight - 50 || i === 1 || i === 4) {
              doc.addPage();
              doc.setPage(doc.getNumberOfPages());
              position = 20;
            }

            doc.setFontSize(12);
            doc.setFontType('bold');
            doc.text(15, position, 'Year ' + (i + 1));
            doc.setDrawColor(0, 0, 0);
            tableArrays[i].id = 'tId' + i;
            doc.autoTable({
              html: '#tId' + i, startY: position + 5, useCss: true,
              didDrawPage: function (data) {
                // if (data.pageNumber > 1) {
                //   // Header
                //   doc.setFontSize(10);
                //   doc.setTextColor(40);
                //   doc.setFontStyle('normal');
                //   doc.text('Report', 15, 5);
                // }
              },
            });
            position = doc.lastAutoTable.finalY + 15;
          }
          doc.addPage();
          doc.setPage(doc.getNumberOfPages());
          position = 20;
          doc.autoTable({
            html: '#expencesTable', startY: position + 5, useCss: true,
            didDrawPage: function (data) {
              // if (data.pageNumber > 1) {
              //   // Header
              //   doc.setFontSize(10);
              //   doc.setTextColor(40);
              //   doc.setFontStyle('normal');
              //   doc.text('Report', 15, 5);
              // }
            },
          });
          // position = doc.lastAutoTable.finalY + 15;

          // doc.autoTable({
          //   html: '#feeTable', startY: position + 5, useCss: true,
          //   didDrawPage: function (data) {
          //     // if (data.pageNumber > 1) {
          //     //   // Header
          //     //   doc.setFontSize(10);
          //     //   doc.setTextColor(40);
          //     //   doc.setFontStyle('normal');
          //     //   doc.text('Report', 15, 5);
          //     // }
          //   },
          // });
          position = doc.lastAutoTable.finalY + 15;

          // expencesTable
          doc.save('LiST_Report.pdf');
        });

      });

      // //   // Few necessary setting options

      // //   // this.imgPath = canvas.toDataURL();
      //   const canvasDistance = elem.innerWdth / canvas.width;
      //   console.log(elem, elem.innerWdth / canvas.width);
      //   const imgWidth = 208;
      //   const pageHeight = 295;
      //   const imgHeight = canvas.height * imgWidth / canvas.width;
      //   const heightLeft = imgHeight;

      //   const contentDataURL = canvas.toDataURL('image/png');
      //   const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      //   const position = 0;
      //   pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
      //   // pdf.addPage('a4');
      //   // pdf.setPage(2);

      //   for (let i = 1; i < 10; i++) {
      //     if (pageHeight * i >= imgHeight) {
      //       break;
      //     }
      //     const cvs = window.document.createElement('canvas');
      //     const destCtx = cvs['getContext']('2d');
      //     // ctx.drawImage(img,0,200,240,297,10,10,200,200);
      //     // window.document.body.appendChild(cvs);
      //     console.log(canvas.width, canvas.height, imgHeight, imgWidth, pageHeight);
      //     cvs.width = canvas.width;
      //     cvs.height = canvas.height;

      //     destCtx.drawImage(canvas, 0, (pageHeight * i) / (imgWidth / canvas.width), canvas.width, canvas.height, 0, 0,
      //       canvas.width, canvas.height);
      //     // destCtx.drawImage(canvas, this.param1, this.param2,
      //     //    this.param3, this.param4, this.param5, this.param6, this.param7, this.param8);
      //     // canvas.width, 600 );
      //     // this.imgPath = canvas.toDataURL();
      //     // this.imgPath2 = cvs.toDataURL();
      //     pdf.addPage('a4');
      //     pdf.setPage(i + 1);

      //     pdf.addImage(cvs.toDataURL(), 'JPEG', 0, 0, imgWidth, imgHeight, '', 'FAST');
      //   }

      // //   // grab the context from your destination canvas

      // //   // pdf.addImage(contentDataURL. 'PNG', )
      //   pdf.save('MYPdf.pdf'); // Generated PDF
    });
    //   const margins = {
    //       top: 80,
    //       bottom: 60,
    //       left: 40,
    //       width: 522
    //   };

    //   const pdf = new jsPDF('p', 'pt', 'letter');
    //   pdf.fromHTML(
    //   elem, // HTML string or DOM elem ref.
    //   margins.left, // x coord
    //   margins.top, { // y coord
    //       'width': margins.width // max width of content on PDF
    //       // 'elementHandlers': specialElementHandlers
    //   },

    //   function (dispose) {
    //       // dispose: object with X, Y of the last line add to the PDF
    //       //          this allow the insertion of new lines after html
    //       // pdf.save('Test.pdf');
    //   }, margins);
    //   setTimeout(function () {
    //   pdf.save('est.pdf');
    // }, 5000);    // Save the PDF
    //   // doc.save('Test.pdf');
  }

  openOngoingDialog() {
    const dialogRef = this.dialog.open(DialogOnboardingComponent, {
      data: { arr: this.ongoingFees, title: 'Annual Ongoing Fees' }
    });
    dialogRef.afterClosed().subscribe(responce => {
      console.log(responce);
      if (responce != null) {
        this.ongoingFees = responce.arr;
        this.getOngoingFees();
      }
    });

  }

  openOnboardingDialog() {
    const dialogRef = this.dialog.open(DialogOnboardingComponent, { data: { arr: this.onBoardingFees, title: 'Onboarding Fees' } });
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

  myObj = [{ sumDies: '' }];
  title = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogLeComponent>) { }

  ngOnInit() {
    console.log(this.data);
    this.title = this.data.title;
    const arr = this.data ? this.data.arr : [53, 70, 83, 91, 93, 96, 94, 87, 80, 74, 62, 48, 33, 20, 10, 4, 2];
    this.myObj[0].sumDies = '' + arr[0];
    for (let index = 1; index < arr.length; index++) {
      const element = arr[index];
      this.myObj.push({ sumDies: '' + element });
    }
  }
  onNoClick(): void {
    // this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
  addYear() {
    this.myObj.push({ sumDies: '' });
  }
  done() {
    this.dialogRef.close({ arr: this.myObj });
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
    this.dialogRef.close({ arr: this.myObj });
  }
  addYear() {
    // this.myObj.push({sumDies: ''});
  }
  done() {
    this.dialogRef.close({ arr: this.myObj });
  }

}

export class Calc {
  // leMonth; // =  [123.5833333, 123.5833333, 123.5833333, 123.5833333, 123.5833333, 123.5833333, 123.5833333, 123.5833333, 123.5833333, 123.5833333, 123.5833333, 123.5833333, 95.83333333, 95.83333333, 95.83333333, 95.83333333, 95.83333333, 95.83333333, 95.83333333, 95.83333333, 95.83333333, 95.83333333, 95.83333333, 95.83333333, 72.66666667, 72.66666667, 72.66666667, 72.66666667, 72.66666667, 72.66666667, 72.66666667, 72.66666667, 72.66666667, 72.66666667, 72.66666667, 72.66666667, 53.83333333, 53.83333333, 53.83333333, 53.83333333, 53.83333333, 53.83333333, 53.83333333, 53.83333333, 53.83333333, 53.83333333, 53.83333333, 53.83333333, 38.75, 38.75, 38.75, 38.75, 38.75, 38.75, 38.75, 38.75, 38.75, 38.75, 38.75, 38.75, 27.25, 27.25, 27.25, 27.25, 27.25, 27.25, 27.25, 27.25, 27.25, 27.25, 27.25, 27.25, 18.41666667, 18.41666667, 18.41666667, 18.41666667, 18.41666667, 18.41666667, 18.41666667, 18.41666667, 18.41666667, 18.41666667, 18.41666667, 18.41666667, 12.16666667, 12.16666667, 12.16666667, 12.16666667, 12.16666667, 12.16666667, 12.16666667, 12.16666667, 12.16666667, 12.16666667, 12.16666667, 12.16666667, 7.666666667, 7.666666667, 7.666666667, 7.666666667, 7.666666667, 7.666666667, 7.666666667, 7.666666667, 7.666666667, 7.666666667, 7.666666667, 7.666666667, 4.666666667, 4.666666667, 4.666666667, 4.666666667, 4.666666667, 4.666666667, 4.666666667, 4.666666667, 4.666666667, 4.666666667, 4.666666667, 4.666666667, 2.666666667, 2.666666667, 2.666666667, 2.666666667, 2.666666667, 2.666666667, 2.666666667, 2.666666667, 2.666666667, 2.666666667, 2.666666667, 2.666666667, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.416666667, 0.416666667, 0.416666667, 0.416666667, 0.416666667, 0.416666667, 0.416666667, 0.416666667, 0.416666667, 0.416666667, 0.416666667, 0.416666667, 0.166666667, 0.166666667, 0.166666667, 0.166666667, 0.166666667, 0.166666667, 0.166666667, 0.166666667, 0.166666667, 0.166666667, 0.166666667, 0.166666667, 0.083333333, 0.083333333, 0.083333333, 0.083333333, 0.083333333, 0.083333333, 0.083333333, 0.083333333, 0.083333333, 0.083333333, 0.083333333, 0.083333333];
  premiums; // = [4705, 14792, 14792, 14792, 14792, 14792, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796, 17796];
  // monthFirstYear = 6;
  faceValue = 0;
  premiumsDiscount;
  premiumsMonth;
  PVFaaceValue;
  sumOfPeople;


  getSumOfPeople(deathTable) {
    let sum = 0;
    let txt = '';
    for (let i = 0; i < deathTable.length; i++) {
      sum += deathTable[i];
      txt += deathTable[i] + ',\n';
    }
    return sum;
  }

  init() {
    // this.sumOfPeople = this.getSumOfPeople(this.leMonth);
    // this.calculate();
  }

  getFaceFaluePerMonthForOneTime(deathTable, faceValue, pc) {
    const numOfLives = this.getSumOfPeople(deathTable);
    const pcm = Math.pow((1 + (pc / 100)), (1 / 12)) - 1;
    let sum = 0;
    for (let i = 0; i < deathTable.length; i++) {
      // console.log(faceValue, (deathTable[i] / numOfLives), (faceValue * (deathTable[i] / numOfLives)), Math.pow((faceValue * (deathTable[i] / numOfLives)) / 1 + pcm, i + 1), pcm);
      sum += (faceValue * (deathTable[i] / numOfLives) / Math.pow(1 + pcm, i + 1));
      // console.log(sum);
    }
    // console.log(sum);
    return sum;
  }

  discountingFaceValue(leMonth, irr) {
    const leMonthCopy = JSON.parse(JSON.stringify(leMonth));
    const array = [];
    for (const i = 0; i < leMonthCopy.length;) {
      const b = this.getFaceFaluePerMonthForOneTime(leMonthCopy, this.faceValue, irr);
      leMonthCopy.shift();
      array.push(b);
    }
    return array;
  }

  getPremiumsDisountingForMonth(deathTable, premiumsPerMonth, pc) {
    const numOfLives = this.getSumOfPeople(deathTable);
    const pcm = Math.pow((1 + (pc / 100)), (1 / 12)) - 1;
    let sum = 0;
    for (let i = 0; i < premiumsPerMonth.length; i++) {
      sum += premiumsPerMonth[i] / Math.pow(1 + pcm, i + 1);
    }
    return sum;
  }

  discountingPremiums(leMonth, pms) {
    const leMonthCopy = JSON.parse(JSON.stringify(leMonth));
    const pmsCopy = JSON.parse(JSON.stringify(pms));
    const array = [];
    for (const i = 0; i < pmsCopy.length;) {
      const b = this.getPremiumsDisountingForMonth(leMonthCopy, pmsCopy, 7);
      pmsCopy.shift();
      array.push(b);
    }
    return array;
  }

  getLeAvg(leMonth) {
    let sumOfYears = 0;
    const sum = this.getSumOfPeople(leMonth);
    for (let k = 0; k < leMonth.length; k++) {
      sumOfYears += (k + 1) * leMonth[k];
    }
    return sumOfYears / sum / 12;
  }

  getLeYearTable(leMonth) {
    const leMonthCopy = JSON.parse(JSON.stringify(leMonth));
    const array = [];
    for (const i = 0; i < leMonthCopy.length;) {
      const sum = this.getSumOfPeople(leMonth);
      let sumOfYears = 0;
      for (let k = 0; k < leMonthCopy.length; k++) {
        sumOfYears += (k + 1) * leMonthCopy[k];
      }
      leMonthCopy.shift();
      array.push(sumOfYears / sum / 12);
    }
    return array;
  }

  calculate(faceValue, leTable, premiums, irr, onboarding, ongoing): SumObject {
    this.faceValue = faceValue;
    // this.leMonth = leMonth;
    this.premiums = premiums;
    this.sumOfPeople = 0; // this.getSumOfPeople(this.leMonth);
    const faceValues = 0; // this.discountingFaceValue(this.leMonth, irr);
    // const pms = this.discountingPremiums(this.leMonth, this.premiums);
    const leYearsTable = leTable;
    const pcm = Math.pow((1 + (irr / 100)), (1 / 12)) - 1;

    let pcForInvestors = 0;
    const obj: OneMonth[] = [];
    for (let i = 0; i < leYearsTable.length; i++) {
      const inner: OneMonth = {
        faceValue: faceValues[i],
        premiumsToday: 0, // pms[i],
        leYear: leYearsTable[i],
        premiums: this.premiums[i] || 0,
        netValue: 0, // faceValues[i] - pms[i],
        pcForInvestor: 0,
        pcForInvestors: 0,
        onboarding: 0,
        ongoing: ongoing / 12
      };
      if (i === 0) {
        inner.onboarding = onboarding;
      }
      if (inner.premiums + inner.onboarding + inner.ongoing) {
        inner.pcForInvestor = ((inner.premiums + inner.onboarding + inner.ongoing)
          * Math.pow(1 + irr / 100, inner.leYear)) / (this.faceValue);
        console.log(inner.premiums, (inner.premiumsToday * Math.pow(1 + irr / 100, inner.leYear)), this.faceValue);
        pcForInvestors += inner.pcForInvestor;
      }
      inner.pcForInvestors = pcForInvestors;
      obj.push(inner);

    }
    console.log(obj);

    const years = [];
    const objCopy = JSON.parse(JSON.stringify(obj));
    let oneYear: OneYear;
    let counter = 0;

    for (; counter < obj.length;) {
      oneYear = {
        faceValue: 0,
        leYear: 0,
        premiums: 0,
        pcForInvestors: 0,
        month: [],
        ongoing: 0,
        onboarding: 0,
        pcForInvestor: 0
      };
      for (let i = 0; i < 12 && counter < obj.length; i++) {
        oneYear.premiums += obj[counter].premiums || 0;
        oneYear.pcForInvestors = obj[counter].pcForInvestors;
        oneYear.pcForInvestor = obj[counter].pcForInvestors;
        oneYear.month.push(obj[counter]);
        oneYear.ongoing += obj[counter].ongoing;
        oneYear.onboarding += obj[counter].onboarding;
        counter++;
      }
      years.push(oneYear);
    }

    console.log(years);
    const retObject: SumObject = {
      perMonth: obj,
      perYear: years,
      faceValue: this.faceValue
    };
    return retObject;
  }

}
export class OneYear {
  faceValue = 0;
  leYear = 0;
  premiums = 0;
  pcForInvestors = 0;
  pcForInvestor = 0;
  month: OneMonth[] = [];
  ongoing = 0;
  onboarding = 0;
}

export class OneMonth {
  faceValue = 0;
  premiumsToday = 0;
  leYear = 0;
  premiums = 0;
  netValue = 0;
  pcForInvestors = 0;
  pcForInvestor = 0;
  onboarding = 0;
  ongoing = 0;
}

export class SumObject {
  perMonth: OneMonth[];
  perYear: OneYear[];
  faceValue: number;
}
