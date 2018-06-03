import { Component, OnInit, Input } from '@angular/core';

import { Node } from '../node';
import { JsonResponse } from '../jsonresponse';
import { VisService } from '../vis.service';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent implements OnInit {

  @Input() node: Node;
  
  constructor(private visService: VisService) {}

  ngOnInit() {
    this.node = new Node();
  }
  
  add() {
    console.log(this.node);
    this.visService.addNode(this.node).subscribe(
      (data: JsonResponse) => {
        console.log(data);
      }
    );
  }

}
