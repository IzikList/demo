import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-chart-canvas',
  templateUrl: './chart-canvas.component.html',
  styleUrls: ['./chart-canvas.component.css']
})
export class ChartCanvasComponent implements OnInit {

@ViewChild('myCanvas') myCanvas: ElementRef;
@Input() color = '#5FB8E8';
 _toPc = 0.9;
@Input() textInside = '50%';
@Input() textBellow = '';

@Input() set toPc(p: number) {
    this._toPc = p;
    this.textInside = Math.floor(p * 100) + '%';
    this.draw();
}
get toPc() {
    return this._toPc;
}

public chart: CanvasRenderingContext2D;
a = {set: function(x, y, radius, from, to, lineWidth, strockStyle) { }, draw: function(dat) {}};
data = {
    numberOfParts: 1,
    parts: {'pt': [60 , 30 , 25 , 25]}, // percentage of each parts
    colors: {'cs': ['red', 'green', 'blue', 'yellow']} // color of each part
};

  constructor() { }

  ngOnInit() {
     this.chart  = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
     this.draw();
  }
  drawdountChart(canvas) {

      this.a.set = function( x, y, radius, from, to, lineWidth, strockStyle) {
          this.x = x * 2;
          this.y = y * 2;
          this.radius = radius * 2;
          this.from = from;
          this.to = to;
          this.lineWidth = lineWidth * 2;
          this.strockStyle = strockStyle;
      };

      this.a.draw = function(dat) {
        canvas.canvas.width = '200';
        canvas.canvas.height = '200';
          canvas.beginPath();
          canvas.lineWidth = this.lineWidth;
          canvas.strokeStyle = this.strockStyle;
          // canvas.arc(this.x , this.y , this.radius , this.from , this.to);
          // canvas.stroke();
          const numberOfParts = dat.numberOfParts;
          const parts = dat.parts.pt;
          const colors = dat.colors.cs;
          let df = 0;
          for (let i = 0; i < numberOfParts; i++) {
              canvas.beginPath();
              canvas.strokeStyle = this.color;
              canvas.arc(this.x, this.y, this.radius, df, df + (Math.PI * 2) * (this.to));
              canvas.stroke();
              df += (Math.PI * 2) * (parts[i] / 100);
          }

        canvas.beginPath();
        canvas.fillStyle = '#aaaaaa';
        canvas.arc(this.x, this.y, this.radius - 14 , df, df + (Math.PI * 2) * (1));
        canvas.fill();
      };
      return this.a;
  }
  draw() {
    const ctx = this.myCanvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.myCanvas.nativeElement, this.myCanvas.nativeElement);
    const drawDount = this.drawdountChart(this.myCanvas.nativeElement.getContext('2d'));
    drawDount.set(50, 50, 30, 0, this._toPc , 5, this.color);
    drawDount.draw(this.data);
  }

}
