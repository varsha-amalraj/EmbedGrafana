import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
export class AppComponent implements OnInit{
  title = 'embed-grafana';
  selectRole = ['Netcon', 'Yavar'];
  getData: boolean = false;
  jsonData: any = [];
  getPanels: any;
  private _jsonURL = 'assets/_files/Home-1624505836296.json';
  panelIdArr: any = [];
  imageLinkArr: any = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(this._jsonURL).subscribe(data =>{
      this.jsonData = data;
      this.getPanels = this.jsonData.panels;
    });
  }

  changeRole(event) {
    this.panelIdArr = [];
    for (let key of Object.keys(this.getPanels)) {
      let panelData = this.getPanels[key];
      if(panelData.title.includes(event.target.value)) {
        this.panelIdArr.push(panelData.id);
      }
    }
    this.getData = true;
  }
}
