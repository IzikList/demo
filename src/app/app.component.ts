import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}



// @Component({
//   selector: 'app-root',
//   template: `
//    <app-bank-account [(ngModel)]="f"></app-bank-account>
//     <button (click)="c()">Click me</button>
// `,
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'app';
//   bankName = 'aaa';
//   f = 1111;
//   c() {
//     console.log(this.f);
//     this.f = 1234;
//   }
// }
