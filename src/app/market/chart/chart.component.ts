import { Component, OnInit } from '@angular/core';
// import { ChartModule } from 'angular2-chartjs';

@Component({
  selector: 'app-chart-market',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          data: [65, 59, 80, 81, 56, 55, 40],
          label: 'Series A',
        }, {
          data: [28, 48, 40, 19, 86, 27, 90],
          label: 'Series B',
        }, {
          data: [18, 48, 77, 9, 100, 27, 40],
          label: 'Series C',
        },
        ],
      };
      options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
              },
            },
          ],
        },
        legend: {
          labels: {
          },
        },
      };
  constructor() { }

  ngOnInit() {
  }

}
