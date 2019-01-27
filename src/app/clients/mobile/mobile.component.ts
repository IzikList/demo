import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  src = '';
  pwd;
  ngOnInit() {
  }

  onFileSelected(event) {
    alert(event);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event2) => { // called once readAsDataURL is completed
        this.src = event2.target['result'];
        console.log(event2);
      };
    }
  }

  uploadFile() {
    this.http.get('https://my-server-demo.herokuapp.com/upload/?pwd=' + this.pwd).subscribe(data => {
        alert(data);
    }, error => {
      console.log(error);
    });
  }
}
