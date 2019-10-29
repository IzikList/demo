import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VideoDialogComponent } from '../../home/video-dialog/video-dialog.component';
declare var $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {

  constructor(private dialog: MatDialog) { }

  @ViewChild('mycards') cardsContainer;

  cards: Array<HTMLElement>;
  center: HTMLElement;
  right: HTMLElement;
  left: HTMLElement;
  i = 1;
  ngOnInit() {
    this.runAnimation();
  }

  ngAfterViewInit() {
    this.cards = this.cardsContainer.nativeElement.children;
    this.cards[0].style.transform = 'translateX(165px) scaleX(0.75) scaleY(0.75)';
    this.cards[0].style.opacity =  '0.5';

    this.cards[2].style.transform = 'translateX(-165px) scaleX(0.75) scaleY(0.75)';
    this.cards[2].style.opacity =  '0.5';


    this.cards[0].style.zIndex = '2';
    this.cards[1].style.zIndex = '3';
    this.cards[2].style.zIndex = '2';

    this.right = this.cards[2];
    this.left = this.cards[0];
    this.center = this.cards[1];

  }

//   $(k).children().eq(1).animate({  fake: 0, fake2: 100 }, {
//     step: function(now,fx) {
//       t1 = now * 1.7;
// 		t2 = now * 2.5;
//       $(this).css('-webkit-transform','translate('+t1+'px,'+0+'px ) scale(' + (1 - (0.001 * t2)) + ')');
//     },
//     duration:'slow'
// },'linear');

  runAnimation() {
    window['particlesJS']('particles-js', {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#0000ff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#30CFD0'
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 5,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#30CFD0',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 3,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });

  }


  showVideo() {
        const dialogRef = this.dialog.open(VideoDialogComponent, {
            height: '80%',
            width: '80%',
         });
        // const v = document.getElementsByClassName('cdk-overlay-pane')[0];
        // v['style'].maxWidth = '';
        // alert(document.getElementById('cdk-overlay-0'));
        dialogRef.afterClosed().subscribe(response => {
        });

  }
  goLink(link) {
    window.open(link, '_blank');
  }
  onSwipeLeft(e) {
    this.animateLeft();
  }
  onSwipeRight(e) {
    this.animateRight();
  }

  animateRight() {
      const v = this;
      const v1 = this.cards;
      const right = this.right;
      const left = this.left;
      const center = this.center;
      right.style.zIndex = '1';
        $(center).animate({  fake: 100}, {
            step: function(now, fx) {
              if (now >= 50) {
                 center.style.zIndex = '2';
                 left.style.zIndex = '3';
              }
            const t1 = now * 1.65;
            const t2 = now * 2.5;
              $(this).css('-webkit-transform', 'translate(' + t1 + 'px,' + 0 + 'px ) scale(' + (1 - (0.001 * t2)) + ')');
              center.style.opacity = '' + ((100 - (now / 2)) * 0.01);
            },
            complete : function() { console.log($(this)[0].fake); $(this)[0].fake = 0; right.style.zIndex = '2'; },
            duration: 'slow'
        }, 'linear');
        $(left).animate({  fake: 100}, {
            step: function(now, fx) {
            left.style.opacity = '' + ((now + 50) * 0.01);
             // console.log(now);
             now = 100 - now;
            const t1 = now * -1.65;
            const t2 = now * 2.5;
              $(this).css('-webkit-transform', 'translate(' + t1 + 'px,' + 0 + 'px ) scale(' + (1 - (0.001 * t2)) + ')');
            },
            complete : function() { console.log($(this)[0].fake); $(this)[0].fake = 0; },
            duration: 'slow'
        }, 'linear');

          $(right).animate({  fake: 100}, {
            step: function(now, fx) {
            now =  now < 50 ? 100 - now :  -now;
            const t1 = now * 1.65;
            const t2 = now * 2.5;
              $(this).css('-webkit-transform', 'translate(' + t1 + 'px,' + 0 + 'px ) scale(0.75)');
            },
            complete : function() { console.log($(this)[0].fake); $(this)[0].fake = 0; },
            duration: 'slow'
        }, 'linear');
      this.center = left;
      this.right = center;
      this.left = right;

  }

  animateLeft () {
      const v = this;
      const v1 = this.cards;
      const right = this.right;
      const left = this.left;
      const center = this.center;
      left.style.zIndex = '1';
        $(center).animate({  fake: 100}, {
            step: function(now, fx) {
              if (now >= 50) {
                 center.style.zIndex = '2';
                 right.style.zIndex = '3';
              }
            const t1 = now * -1.65;
            const t2 = now * 2.5;
              $(this).css('-webkit-transform', 'translate(' + t1 + 'px,' + 0 + 'px ) scale(' + (1 - (0.001 * t2)) + ')');
              center.style.opacity = '' + ((100 - (now / 2)) * 0.01);
            },
            complete : function() { console.log($(this)[0].fake); $(this)[0].fake = 0; left.style.zIndex = '2'; },
            duration: 'slow'
        }, 'linear');
        $(right).animate({  fake: 100}, {
            step: function(now, fx) {
            right.style.opacity = '' + ((now + 50) * 0.01);
             // console.log(now);
             now = 100 - now;
            const t1 = now * 1.65;
            const t2 = now * 2.5;
              $(this).css('-webkit-transform', 'translate(' + t1 + 'px,' + 0 + 'px ) scale(' + (1 - (0.001 * t2)) + ')');
            },
            complete : function() { console.log($(this)[0].fake); $(this)[0].fake = 0; },
            duration: 'slow'
        }, 'linear');

          $(left).animate({  fake: 100}, {
            step: function(now, fx) {
            now =  now < 50 ? 100 - now :  -now;
            const t1 = now * -1.65;
            const t2 = now * 2.5;
              $(this).css('-webkit-transform', 'translate(' + t1 + 'px,' + 0 + 'px ) scale(0.75)');
            },
            complete : function() { console.log($(this)[0].fake); $(this)[0].fake = 0; },
            duration: 'slow'
        }, 'linear');
      this.center = right;
      this.right = left;
      this.left = center;

  }
}
