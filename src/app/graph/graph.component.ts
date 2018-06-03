import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { VisService } from '../vis.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  
  @ViewChild('visGraph') private visGraph;
  
  constructor(private visService: VisService) { }
//
  ngOnInit() {
    console.log('init graph component');
    VisService.networkOptions = {
      nodes: {},
      edges: {},
      interaction: {
        multiselect: true
      },
      layout: {},
      manipulation: {},
      physics: {}
    };
  }
  
  ngAfterViewInit() {
    console.log('init graph component view');
    this.visService.initGraph($('#visGraph').get(0));
  }

}
