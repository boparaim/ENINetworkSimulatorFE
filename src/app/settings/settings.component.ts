import { Component, OnInit, Input } from '@angular/core';

import { RestapiService } from '../restapi.service';
import { JsonResponse } from './jsonresponse';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() configuration: any = {};
  
  constructor(private restapiService: RestapiService) { }

  ngOnInit() {
    this.getStats();
  }
  
  getStats() {
    this.restapiService.getStats().subscribe(
      (data: any) => {
        console.log(data);
        
        if (data.totalNodes !== undefined && data.totalNodes != null) {
          this.configuration.totalNodes = data.totalNodes;
        }
        if (data.totalNodes !== undefined && data.totalNodes != null) {
          this.configuration.totalEdges = data.totalEdges;
        }
        if (data.totalNodes !== undefined && data.totalNodes != null) {
          this.configuration.uniqueNodes = data.uniqueNodes;
        }
        if (data.totalNodes !== undefined && data.totalNodes != null) {
          this.configuration.uniqueEdges = data.uniqueEdges;
        }
      }
    );
  }
  
  importFromJsonText() {
    this.restapiService.postTopologyData(this.configuration.importText).subscribe(
      (data: JsonResponse) => {
        console.log(data);
        this.configuration.importTextResult = JSON.stringify(data);
        this.getStats();
      }
    );
  }
  
  deleteTopologyData() {
    this.restapiService.deleteTopologyData().subscribe(
      (data: JsonResponse) => {
        console.log(data);
        this.configuration.deleteTopologyResult = JSON.stringify(data);
        this.getStats();
      }
    );
  }

}
