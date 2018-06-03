import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Node } from './node';
import { Edge } from './edge';
import { JsonResponse } from './jsonresponse';

import * as vis from '../../node_modules/vis/dist/vis.js';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VisService {

  public static network: vis.Network;
  public static networkOptions: any = {};
  private nodesDataset: vis.DataSet;
  private edgeDataset: vis.DataSet;
  
  private urlGetNodes = 'http://localhost:8095/ENINetworkSimulator/fe/nodes';
  private urlGetEdges = 'http://localhost:8095/ENINetworkSimulator/fe/edges';
  private urlPutNode = 'http://localhost:8095/ENINetworkSimulator/fe/node';
  private urlPutEdge = 'http://localhost:8095/ENINetworkSimulator/fe/edge';
  
  constructor(private http: HttpClient) {
    /*console.log(vis);*/
    console.log('starting vis-service');
    this.nodesDataset = new vis.DataSet();
    this.edgeDataset = new vis.DataSet();
  }
  
  initDataset() {
    console.log('initializing dataset');
    this.getNodes().subscribe(
      (data: Node[]) => {
        //console.log(data)
        //this.nodesDataset = VisService.network.body.data.nodes;
        data.forEach((node) => {
          //console.log(node);
          if (this.nodesDataset.get(node.id) != null) {
            //console.log('id already present');
            return true;
          }
          
          this.addNodeToNetwork(node);
          /*this.nodesDataset.add({
            id: node.id,
            name: node.name,
            ip: node.ip,
            mac: node.mac,
            vendor: node.vendor,
            model: node.model,
            'type': node.type,
            metadata: node.metadata,
            label: node.name,
            title: node.name
          });*/
          /*this.nodesDataset.update({
            id: node.id
          });*/
        });
        
        this.getEdges().subscribe(
          (data: Edge[]) => {
            //console.log(data)
            data.forEach((edge) => {
              //console.log(node);
              if (this.edgeDataset.get(edge.id) != null) {
                //console.log('id already present');
                return true;
              }
              
              this.addEdgeToNetwork(edge);
            });
          }
        );
      }
    );
    
    
  }
  
  initGraph(container) {
    //console.log(container);
    //console.log(VisService.network);
    /*if (VisService.network !== undefined) {
      return;
    }*/
    
    VisService.network = new vis.Network(
                            container, 
                            {nodes: this.nodesDataset, edges: this.edgeDataset}, 
                            VisService.networkOptions
                          );
  }

  getNodes(): Observable<Node[]> {
    console.log('getting nodes');
    return this.http.get<Node[]>(this.urlGetNodes);
            //.pipe(catchError(this.handleError('getNodes', [])))
  }

  getEdges(): Observable<Edge[]> {
    console.log('getting edges');
    return this.http.get<Edge[]>(this.urlGetEdges);
            //.pipe(catchError(this.handleError('getNodes', [])))
  }
  
  addNode(node: Node): Observable<JsonResponse> {
    console.log('adding node');
    return this.http.put<JsonResponse>(this.urlPutNode, node);
  }
  
  addEdge(edge: Edge): Observable<JsonResponse> {
    console.log('adding edge');
    return this.http.put<JsonResponse>(this.urlPutEdge, edge);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
  
  addNodeToNetwork(node: Node) {
    this.nodesDataset.add({
      id: node.id,
      name: node.name,
      ip: node.ip,
      mac: node.mac,
      vendor: node.vendor,
      model: node.model,
      'type': node.type,
      metadata: node.metadata,
      label: node.name,
      title: this.createNodeTitle(node)
    });
  }
  
  createNodeTitle(node: Node): string {
    let titleString = '';
    titleString += '<table id="nodeTitle">';
    titleString += '<tr><td><b>Id:</b></td><td>' + node.id + '</td></tr>';
    titleString += '<tr><td><b>Name:</b></td><td>' + node.name + '</td></tr>';
    titleString += '<tr><td><b>IP:</b></td><td>' + node.ip + '</td></tr>';
    titleString += '<tr><td><b>MAC:</b></td><td>' + node.mac + '</td></tr>';
    titleString += '<tr><td><b>Vendor:</b></td><td>' + node.vendor + '</td></tr>';
    titleString += '<tr><td><b>Model:</b></td><td>' + node.model + '</td></tr>';
    titleString += '<tr><td><b>Type:</b></td><td>' + node.type + '</td></tr>';
    titleString += '</table>';
    return titleString;
  }
  
  addEdgeToNetwork(edge: Edge) {
    this.edgeDataset.add({
      id: edge.id,
      nodeIdA: edge.nodeIdA,
      nodeIdB: edge.nodeIdB,
      ifIndexA: edge.ifIndexA,
      ifIndexB: edge.ifIndexB,
      'from': edge.nodeIdA,
      'to': edge.nodeIdB,
      title: this.createEdgeTitle(edge)
    });
  }
  
  createEdgeTitle(edge: Edge): string {
    let titleString = '';
    titleString += '<table id="edgeTitle">';
    titleString += '<tr><td><b>Id:</b></td><td>' + edge.id + '</td></tr>';
    titleString += '<tr><td><b>Node Id A:</b></td><td>' + edge.nodeIdA + '</td>';
    titleString += '    <td><b>Node Id B:</b></td><td>' + edge.nodeIdB + '</td></tr>';
    titleString += '<tr><td><b>Node name A:</b></td><td>' + this.nodesDataset.get(edge.nodeIdA).name + '</td>';
    titleString += '    <td><b>Node name B:</b></td><td>' + this.nodesDataset.get(edge.nodeIdB).name + '</td></tr>';
    titleString += '<tr><td><b>IF index A:</b></td><td>' + edge.ifIndexA + '</td>';
    titleString += '    <td><b>IF index B:</b></td><td>' + edge.ifIndexB + '</td></tr>';
    titleString += '</table>';
    return titleString;
  }
  
  clearNetwork() {
    this.nodesDataset.clear();
    this.edgeDataset.clear();
  }

}
