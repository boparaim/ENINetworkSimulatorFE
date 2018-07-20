/**
 * This class is a static placeholder for all fluid configurations.
 */
export class ApplicationProperties {
    public static remoteHost: string = 'localhost';//'192.168.78.128';
    public static remotePort: string = '8095';
    public static remoteProtocol: string = 'http';
    public static serverApplicationContext: string = 'ENINetworkSimulator';
    
    public static serverUrl = ApplicationProperties.remoteProtocol
                                + '://' + ApplicationProperties.remoteHost
                                + ':' + ApplicationProperties.remotePort;
    
    public static visOptions = {
        nodes: {},
        edges: {
            smooth: {
                type: 'continuous'
            }
        },
        interaction: {
            dragNodes: false,
            multiselect: true,
            navigationButtons: true
        },
        layout: {},
        manipulation: {},
        physics: {
            enabled: false,
            repulsion: {
                nodeDistance: 200
            },
            solver: 'repulsion',
            stabilization: {
                iterations: 1000 
            }
        }
    };
}