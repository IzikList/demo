import { Component, OnInit } from '@angular/core';
// import * as Chart from 'chart.js'
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})

export class MarketComponent implements OnInit {

  asks = [{ price: 15.7, amount: 0.9 }, { price: 15.7, amount: 1.1 }, { price: 15.7, amount: 1.9 }];

  canvas: any;
  ctx: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  // chartDefault = {
  //   type: 'bar',
  //   data: {
  //     labels: ['30', '45', '60', '90', '120', '120+'],
  //     datasets: [{
  //       type: 'bar',
  //       label: 'Receivable',
  //       data: [730, 492.5, 120, 4732.5, 2760.85, 0],
  //       backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       borderWidth: 1
  //     }, {
  //       type: 'bar',
  //       label: 'Past Due',
  //       data: [2760.85, 0, 0, 0, 0, 0],
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgba(255,99,132,1)',
  //       borderWidth: 1
  //     }, {
  //       type: 'scatter',
  //       label: 'Invoice',
  //       data: [{ "x": 106, "y": 177.7 }, { "x": 101, "y": 1 }
  // , { "x": 92, "y": 1 }, { "x": 88, "y": 120 }, { "x": 65, "y": 4 }, { "x": 66, "y": 120 }, { "x": 59, "y": 120 }, { "x": 36, "y": 372.5 }, { "x": 35, "y": 120 }, { "x": 29, "y": 120 }, { "x": 4, "y": 185 }, { "x": 4, "y": 120 }, { "x": 1, "y": 240 }, { "x": 1, "y": 65 }],
  //       xAxisID: 'invoice-time',
  //       yAxisID: 'invoice-amount',
  //       backgroundColor: 'rgba(75, 00, 150, 0.2)',
  //       borderColor: 'rgba(75, 00, 150,1)',
  //       borderWidth: 2
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       xAxes: [{
  //         display: true,
  //         stacked: true,
  //         scaleLabel: {
  //           display: true,
  //           labelString: 'Days'
  //         },
  //       }, {
  //         id: 'invoice-time',
  //         type: 'linear',
  //         display: false,
  //         stacked: false,
  //         scaleLabel: {
  //           display: false,
  //           labelString: 'Days'
  //         },
  //         ticks: {
  //           beginAtZero: true,
  //           stepSize: 1,
  //           suggestedMax: 125
  //         }
  //       }],
  //       yAxes: [{
  //         display: true,
  //         stacked: true,
  //         scaleLabel: {
  //           display: true,
  //           labelString: 'Dollar Amount'
  //         },
  //         ticks: {
  //           beginAtZero: true,
  //         }
  //       }, {
  //         id: 'invoice-amount',
  //         display: false,
  //         stacked: false,
  //         scaleLabel: {
  //           display: false,
  //           labelString: 'Dollar Amount'
  //         },
  //         ticks: {
  //           beginAtZero: true,
  //         }
  //       }]
  //     },
  //   }
  // };

  // ngAfterViewInit() {
  //   // this.canvas = document.getElementById('myChart');
  //   // this.ctx = this.canvas.getContext('2d');
  //   // var data = {
  //   //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   //   datasets: [{
  //   //     label: "My First dataset",
  //   //     //new option, type will default to bar as that what is used to create the scale
  //   //     type: "line",
  //   //     fillColor: "rgba(220,220,220,0.2)",
  //   //     strokeColor: "rgba(220,220,220,1)",
  //   //     pointColor: "rgba(220,220,220,1)",
  //   //     pointStrokeColor: "#fff",
  //   //     pointHighlightFill: "#fff",
  //   //     pointHighlightStroke: "rgba(220,220,220,1)",
  //   //     data: [65, 59, 4, 81, 56, 55, 40]
  //   //   }, {
  //   //     label: "My First dataset",
  //   //     //new option, type will default to bar as that what is used to create the scale
  //   //     type: "bar",
  //   //     fillColor: "rgba(220,20,220,0.2)",
  //   //     strokeColor: "rgba(220,20,220,1)",
  //   //     pointColor: "rgba(220,20,220,1)",
  //   //     pointStrokeColor: "#fff",
  //   //     pointHighlightFill: "#fff",
  //   //     pointHighlightStroke: "rgba(220,220,220,1)",
  //   //     data: [32, 25, 33, 88, 12, 92, 33]
  //   //   }]
  //   // };
  //   // // var myChart = new Chart(this.ctx, data)
  //   // let myChart = new Chart(this.ctx, {
  //   //   type: 'line',
  //   //   data: {
  //   //     labels: ["New", "In Progress", "On Hold"],
  //   //     datasets: [{
  //   //       label: '# of Votes',
  //   //       data: [1, 2, 3],
  //   //       backgroundColor: [
  //   //         'rgba(255, 99, 132, 1)',
  //   //         'rgba(54, 162, 235, 1)',
  //   //         'rgba(255, 206, 86, 1)'
  //   //       ],
  //   //       borderWidth: 1
  //   //     },
  //   //     {

  //   //       type: 'bar',  // override the default type
  //   //       data: [1, 2, 3]
  //   //     }
  //   //     ]
  //   //   },
  //   //   options: {
  //   //     responsive: false,
  //   //     // display:true
  //   //   }
  //   //   // alert("aa")
  //   // });
  // }
}
