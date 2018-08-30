// import { Component, OnInit, ViewEncapsulation, forwardRef } from '@angular/core';
// import { NgModelBaseComponent } from './NgModelBase';
// import { NG_VALUE_ACCESSOR } from '@angular/forms';


// export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => TestInputComponent),
//     multi: true
// };

// export class TestInputComponent extends NgModelBaseComponent {
//     hoverText = 'Wow, look at this custom hover text for your input.';
// }

// @Component({
//   selector: 'app-numinput',
//   template: '<input [(ngModel)]="value"/>',
//   styles: [],
//   providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ]
// })
// export class NuminputComponent implements OnInit {
//   value = 100;
//   constructor() { }

//   ngOnInit() {
//   }

// }
