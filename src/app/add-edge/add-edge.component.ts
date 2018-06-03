import { Component, OnInit, Input } from '@angular/core';

import { Edge } from '../edge';
import { JsonResponse } from '../jsonresponse';
import { VisService } from '../vis.service';

@Component({
  selector: 'app-add-edge',
  templateUrl: './add-edge.component.html',
  styleUrls: ['./add-edge.component.css']
})
export class AddEdgeComponent implements OnInit {

  @Input() edge: Edge;
  
  constructor(private visService: VisService) { }

  ngOnInit() {
    this.edge = new Edge();
  }
  
  add() {
    console.log(this.edge);
    this.visService.addEdge(this.edge).subscribe(
      (data: JsonResponse) => {
        console.log(data);
      }
    );
  }

}
