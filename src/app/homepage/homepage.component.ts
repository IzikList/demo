import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  imageUrlArray = [
    // {url: '/assets/images/happy.jpg', text: 'Maximize the value of your asset, you <span class="bold">deserve it</span>',
    //  btnText: 'Learn More'},
    // {url: '/assets/images/happy_9.jpg', text: 'Life insurance is valuable, we want you to <span class="bold">keep it!</span>',
    //   btnText: 'Get Policy Forecast', goto: '/clients/report'},
    // {url: '/assets/images/investing.png', text: 'Investing In <span class="bold">' +
    //   'Life Settlements</span><br /><span class="bold">Made Simple</span>, Secure & Liquid',
    //   btnText: 'Go To Market', goto: '/aws'}
    {url: '/assets/images/img1.jpg', text: 'Maximize the value of your asset, you <span class="bold">deserve it</span>',
     btnText: 'Learn More'},
    {url: '/assets/images/img2.jpg', text: 'Life insurance is valuable, we want you to <span class="bold">keep it!</span>',
      btnText: 'Get Policy Forecast', goto: '/clients/report'},
    {url: '/assets/images/img3.jpg', text: 'Investing In <span class="bold">' +
      'Life Settlements</span><br /><span class="bold">Made Simple</span>, Secure & Liquid',
      btnText: 'Go To Market', goto: '/aws'}

    ];
  position = 0;
  amount;
  prev: HTMLElement;
  next: HTMLElement;
  current;
  elements: HTMLCollection;
  bindFunction;
  bindAnimateFunction;
  animationState = false;
  timeOutObj;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    const a = 5;
    const b = 10;
    console.log(a + b);
  }
  ngAfterViewInit() {
    this.amount = document.getElementById('slides').children.length;
    const array = document.getElementById('slides').children;
    this.elements = array;
    this.bindFunction = this.transitionCompleted.bind(this);
    this.bindAnimateFunction = this.animateRight.bind(this);
    this.order();
    this.loop();
  }

  loop() {
    this.timeOutObj = setTimeout(this.bindAnimateFunction, 1000 * 5);
  }

  transitionCompleted = function (c) {
      this.order();
      this.loop();
      this.animationState = false;
  };

  addEventsListener(element) {
      element.addEventListener('transitionend',       this.bindFunction, true);
      element.addEventListener('webkitTransitionEnd', this.bindFunction, true);
      element.addEventListener('oTransitionEnd',      this.bindFunction, true);
      element.addEventListener('MSTransitionEnd',     this.bindFunction, true);
  }

  removeEventsListener(element) {
      element.removeEventListener('transitionend',       this.bindFunction, true);
      element.removeEventListener('webkitTransitionEnd', this.bindFunction, true);
      element.removeEventListener('oTransitionEnd',      this.bindFunction, true);
      element.removeEventListener('MSTransitionEnd',     this.bindFunction, true);
  }

  order() {
    let prev, next;
    if (this.position === 0) {
      prev = this.elements[this.amount - 1];
      next = this.elements[this.position + 1];
    } else if (this.position === this.amount - 1) {
      prev = this.elements[this.position - 1];
      next = this.elements[0];
    } else {
      prev = this.elements[this.position - 1];
      next = this.elements[this.position + 1];
    }
    prev.classList.remove('animate');
    this.removeEventsListener(prev);
    prev.style.transform = 'translate(-100%)';

    next.classList.remove('animate');
    this.removeEventsListener(next);
    next.style.transform = 'translate(100%)';

    this.prev = prev;
    this.next = next;
    this.current = this.elements[this.position];
    this.removeEventsListener(this.current);
  }

  animateRight() {
    if (this.animationState) {
      return;
    }
    this.animationState = true;
    clearTimeout(this.timeOutObj);

    this.current.classList.add('animate');
    this.next.classList.add('animate');
    this.addEventsListener(this.next);
    this.next.style.opacity = '1';
    this.next.style.transform = 'translate(0%)';
    this.next.style.opacity = '1';
    this.current.style.transform = 'translate(-100%)';
    this.position ++;
    if ( this.position >= this.amount) {
      this.position = 0;
    }
  }
  animateLeft() {
    if (this.animationState) {
      return;
    }
    this.animationState = true;
    clearTimeout(this.timeOutObj);

    this.current.classList.add('animate');
    this.prev.classList.add('animate');
    this.addEventsListener(this.prev);
    this.prev.style.transform = 'translate(0%)';
    this.prev.style.opacity = '1';
    this.current.style.transform = 'translate(100%)';
    this.position --;
    if ( this.position < 0) {
      this.position = this.amount - 1;
    }
  }

  test() {
        const dialogRef = this.dialog.open(RegistrationComponent, { });
        const v = document.getElementsByClassName('cdk-overlay-pane')[0];
        v['style'].maxWidth = '';
        // alert(document.getElementById('cdk-overlay-0'));
        dialogRef.afterClosed().subscribe(responce => {
          console.log(responce);
          if (responce != null) {
            // this.ongoingFees = responce.arr;
            // this.getOngoingFees();
          }
        });

  }


  // test() {
  //   let index = 0;
  //   let amount = 0; // amount of images
  //   const currTransl = [];
  //   let translationComplete = true;

  //   const transitionCompleted = function () {
  //     translationComplete = true;
  //   };

  //   document.addEventListener("DOMContentLoaded", function (event) {
  //     amount = document.getElementById('carussel').children.length;
  //     // amount = document.getElementsByTagName('img').length;
  //     // document.getElementsByTagName('span')[0].innerHTML = amount;
  //     for (let i = 0; i < amount; i++) {
  //       currTransl[i] = -200;
  //       document.getElementsByTagName('img')[i].addEventListener("transitionend", transitionCompleted, true);
  //       document.getElementsByTagName('img')[i].addEventListener("webkitTransitionEnd", transitionCompleted, true);
  //       document.getElementsByTagName('img')[i].addEventListener("oTransitionEnd", transitionCompleted, true);
  //       document.getElementsByTagName('img')[i].addEventListener("MSTransitionEnd", transitionCompleted, true);
  //     }
  //     console.log("DOM fully loaded and parsed");
  //   });

  //   function right() {
  //     if (translationComplete === true) {
  //       translationComplete = false;
  //       index--;
  //       if (index === -1) {
  //         index = amount - 1;
  //       }
  //       const outerIndex = (index) % amount;
  //       document.getElementById('index').innerHTML = outerIndex === 0 ? 5 : outerIndex;
  //       for (let i = 0; i < amount; i++) {
  //         const img = document.getElementsByClassName('img')[i];
  //         img.style.opacity = '1';
  //         img.style.transform = 'translate(' + (currTransl[i] + 200) + 'px)';
  //         //img.className = 'img';
  //         //img.className.replace( /(?:^|\s)animate(?!\S)/g , '' );
  //         currTransl[i] = currTransl[i] + 200;
  //       }

  //       const outerImg = document.getElementsByClassName("img")[outerIndex];
  //       outerImg.style.transform = 'translate(' + (currTransl[outerIndex] - 200 * (amount)) + 'px)';
  //       outerImg.style.opacity = '0';
  //       currTransl[outerIndex] = currTransl[outerIndex] - 200 * (amount);
  //     }
  //   }

  //   function left() {
  //     if (translationComplete === true) {
  //       translationComplete = false;
  //       index++;
  //       var outerIndex = (index - 1) % amount;
  //       document.getElementById('index').innerHTML = outerIndex + 1;
  //       for (var i = 0; i < amount; i++) {
  //         var img = document.getElementsByClassName("img")[i];
  //         img.style.opacity = '1';
  //         img.style.transform = 'translate(' + (currTransl[i] - 200) + 'px)';
  //         currTransl[i] = currTransl[i] - 200;
  //       }
  //       var outerImg = document.getElementsByClassName("img")[outerIndex];
  //       outerImg.style.transform = 'translate(' + (currTransl[outerIndex] + 200 * (amount)) + 'px)';
  //       outerImg.style.opacity = '0';
  //       currTransl[outerIndex] = currTransl[outerIndex] + 200 * (amount);
  //     }
  //   }
  // }
}
