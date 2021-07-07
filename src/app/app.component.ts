import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import axios from 'axios';
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'embed-grafana';
  selectRole = ['Netcon', 'Yavar'];
  getData: boolean = false;
  jsonData: any = [];
  getPanels: any;
  private _jsonURL = 'assets/_files/Home-1624505836296.json';
  panelIdArr: any = [];
  imageLinkArr: any = [];
  data;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.data = this.getGrafana();
    this.httpClient.get(this._jsonURL).subscribe(data => {
      this.jsonData = data;
      this.getPanels = this.jsonData.panels;
    });
  }

  changeRole(event) {
    console.log(this.data);

    this.panelIdArr = [];
    for (let key of Object.keys(this.getPanels)) {
      let panelData = this.getPanels[key];
      if (panelData.title.includes(event.target.value)) {
        this.panelIdArr.push(panelData.id);
      }
    }
    this.getData = true;
  }

  getGrafana() {
    // let header = new HttpHeaders();
   this.httpClient.get('http://localhost:4200/api/dashboards/uid/rX-QKIRnk').subscribe(res => {
     console.log(res);

   });

  }
}

