export namespace PacketCapture {
	
	export class Interface {
	    Name: string;
	    Details: {[key: string]: string};
	
	    static createFrom(source: any = {}) {
	        return new Interface(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Details = source["Details"];
	    }
	}

}

