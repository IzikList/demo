import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  investorView = true;
  policyHolderView = false;
  firstName: String;
  lastName: String;
  phoneNumber: String;
  email: String;
  userText: String;
  allowEmail: Boolean;
  completeView = false;
  waitForCall: Boolean;

  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RegistrationComponent>) { }

  ngOnInit() {
    if (window.innerWidth < 1050) {
      this.investorView = false;
      this.policyHolderView = false;
    }
  }

  register() {
    console.log(this.firstName, this.email, this.phoneNumber, this.userText);
    this.http.post('/api/register', {
      isInvestor: this.investorView,
      isPolicyHolder: !this.investorView,
      firstName: this.firstName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      userText: this.userText,
      meta: {
        allowEmail: this.allowEmail,
        waitForCall: this.waitForCall
      }
    }).subscribe(data => {
      this.dialogRef.close({complete: true});
    }, error => {
      console.log(error);
    });

  }
  close() {
    this.dialogRef.close();
  }

}
