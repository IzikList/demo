import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VideoDialogComponent } from '../../home/video-dialog/video-dialog.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  showVideo() {
        const dialogRef = this.dialog.open(VideoDialogComponent, {
            autoFocus: false,
            panelClass: 'panelClass'
         });
        const v = document.getElementsByClassName('cdk-overlay-pane')[0];
        v['style'].maxWidth = '';
        // alert(document.getElementById('cdk-overlay-0'));
        dialogRef.afterClosed().subscribe(response => {
        });

  }
}
