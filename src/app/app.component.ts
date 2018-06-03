import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as $ from 'jquery';
import { VisService } from './vis.service';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private visService: VisService,
    private websocketService: WebsocketService) { }
  
  ngOnInit() {
    console.log('init app component');
    this.visService.initDataset();
    //this.websocketService.openWS();
  }

}
