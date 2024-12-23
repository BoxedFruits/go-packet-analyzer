export namespace PacketCapture {
	
	export class NetworkInterface {
	    Name: string;
	    Details: {[key: string]: string};
	
	    static createFrom(source: any = {}) {
	        return new NetworkInterface(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Details = source["Details"];
	    }
	}

}

