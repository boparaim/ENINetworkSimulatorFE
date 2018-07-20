import { Component, OnInit, Input } from '@angular/core';

//import * as $ from 'jquery';
//import * as $  from 'jquery';
//import * as pekeupload from 'pekeupload';
//import 'pekeupload';
//import jQuery from '../../../node_modules/pekeupload/js/pekeUpload.js';
import { RestapiService } from '../restapi.service';
import { JsonResponse } from '../jsonresponse';
import { ApplicationProperties } from '../application-properties';

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

    ngAfterViewInit() {
        //console.log(jQuery)  
        /*jQuery("#importPcap").pekeUpload({
            bootstrap: true,
            btnText: 'Upload pcap file',
            allowedExtensions: 'pcap',                           //'jpg|jpeg|svg|png'
            invalidExtError: 'Only pcap files are allowed.',     //'Only jpg, jpeg, svg, png files are allowed.'
            maxSize: 50 * 1000000, // 50mb
            sizeError: 'File size larger than 50mb.',
            url: ApplicationProperties.serverUrl + '/' + ApplicationProperties.serverApplicationContext + '/fe/pcap-file',
            showPreview: false,
            showFilename: true,
            showPercent: true,
            showErrorAlerts: true,
            delfiletext: '',
            onFileError: function(file, error) {
                console.log(file, error);
                $('#importPcap').val('');
            },
            onFileSuccess: function(file, data) {
                console.log(file, data);
                $('#importPcap').val('');
            }
        })(jQuery);*/
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
    
    fileChangeEvent(changeEvent: any) {
        console.log(changeEvent, this.configuration.pcapFile);
        this.configuration.pcapFileObj = changeEvent.target.files[0];
    }
    
    uploadPcap() {
        let file :File = this.configuration.pcapFileObj;
        if (!file) {
            this.configuration.importPcapResult = 'please chose a file to upload';
            return;
        }
        if (!/\.pcap$/i.test(file.name)) {
            this.configuration.importPcapResult = 'please chose a PCAP file to upload';
            return;
        }
        if (file.size > (50 * 1000 * 1000)) {
            this.configuration.importPcapResult = 'file size limit is 50mb';
            return;
        }
        
        this.restapiService.postPcapFile(file).subscribe(
            (data: JsonResponse) => {
                console.log(data);
                this.configuration.importPcapResult = JSON.stringify(data);
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

    exportTopologyData() {
        this.restapiService.exportTopologyData().subscribe(
            (data: JsonResponse) => {
                console.log(data);
                //this.configuration.exportTopologyResult = JSON.stringify        
                const seconds = Math.floor(new Date().getTime() / 1000);
                const filename = 'topology-data-' + seconds + '.txt';
                const file = new Blob([JSON.stringify(data)], { type: 'text/plain' });

                if (window.navigator.msSaveOrOpenBlob) { // IE10+
                    window.navigator.msSaveOrOpenBlob(file, filename);
                } else { // Others
                    const a = document.createElement("a"),
                        url = URL.createObjectURL(file);
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(function() {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    }, 0);
                }
            }
        );
    }



}
