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
  src2 = '';
  pwd;
  marginLeft = 0;
  ngOnInit() {
  }

  onFileSelected1(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event2) => { // called once readAsDataURL is completed
        this.src = event2.target['result'];
        console.log(event2);
        document.getElementById('imageContainer1').style.display = 'block';
      };
    }
  }
  onFileSelected2(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event2) => { // called once readAsDataURL is completed
        this.src2 = event2.target['result'];
        console.log(event2);
        document.getElementById('imageContainer2').style.display = 'block';
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

  c() {
    const obj = document.getElementById('slider');
    const obj2 = document.getElementById('inner');
    this.animateLeft(obj, this.marginLeft, this.marginLeft - obj2.clientWidth);
  }
  c2() {
    this.c();
    this.uploadFile();
  }
  animateLeft(obj, from, to) {
   if (from <= to) {
       // obj.style.visibility = 'hidden';
       return;
   } else {
       const box = obj;
       box.style.marginLeft = from + 'px';
       this.marginLeft = from;
       setTimeout(() => {
           this.animateLeft(obj, from - 6, to);
       }, 10);
   }
}

}
