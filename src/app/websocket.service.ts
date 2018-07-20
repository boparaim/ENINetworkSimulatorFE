import { Injectable } from '@angular/core';

import { VisService } from './vis.service';

import * as SockJS from '../../node_modules/sockjs-client/dist/sockjs.js';
import { Stomp } from '../../node_modules/stompjs/lib/stomp.js';

import { ApplicationProperties } from './application-properties';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient: any = null;
  private connected = false;
  private serverUrl = ApplicationProperties.serverUrl + '/' + ApplicationProperties.serverApplicationContext + '/websocket'; 
  private topicUrl = '/topic/test-websocket-reply';
  private messagePathPrefix = '/websocket-route';

  constructor(private visService: VisService) {
    console.log('starting web-socket service');
    this.openWS();
  }

  openWS() {
    if (!this.connected && this.stompClient == null) {
      console.log('opening ws');
      const socket = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame: any) => {
        console.log('ws connected', frame);
        this.connected = true;
        this.stompClient.subscribe(this.topicUrl, (reply) => {
          console.log('received from server ', reply);
          
          if (reply && reply.body) {
            try {
              const eventObject = JSON.parse(reply.body);
              const messageObj = JSON.parse(eventObject.metadata);
              //console.log(eventObject, messageObj);
              const eventType = eventObject.type;
              
              switch (eventType) {
                case 'NODE_CREATED':
                  this.visService.addNodeToNetwork(messageObj);
                  break;
                case 'EDGE_CREATED':
                  this.visService.addEdgeToNetwork(messageObj);
                  break;
                case 'TOPOLOGY_DELETED':
                  this.visService.clearNetwork();
                  break;
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
      });
    }
  }

  closeWS() {
    if (this.connected && this.stompClient != null) {
      console.log('disconnecting ws');
      this.connected = false;
      this.stompClient.disconnect();
    }
  }

  /**
   * url: /test-websocket
   * jsonData: {'data':'some text'}
   */
  send(url: string, jsonData: any) {
    if (this.connected && this.stompClient != null) {
      this.stompClient.send(url, {}, JSON.stringify(jsonData));
    } else {
      console.log('run ws.openWS() first');
    }
  }

}
