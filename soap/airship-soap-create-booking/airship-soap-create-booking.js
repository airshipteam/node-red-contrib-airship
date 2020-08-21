module.exports = function (RED) {

    const airshipsoap = require('../../libs/airshipsoap');

    function SoapCall(n) {

        RED.nodes.createNode(this, n);
        
		this.wsdl    = 'https://secure.airship.co.uk/SOAP/V3/Bookings.wsdl';
		this.method  = 'createBooking';
		this.payload = n.payload;
        this.status({});


        /**
		 * Shows a status visual on the node
		 * @param  {[string]} colour [colour of status (green, yellow, red)]
		 * @param  {[string]} shape [shape of symbol]
		 * @param  {[text]} text [text to show]
		 */
        this.showstatus = (colour, shape, text) => {
			this.status({fill:colour,shape:shape,text:text});
        };

        /**
		 * Logs an error message
		 * @param  {[string]} msg [error message]
		 */
        this.showerror = (payload) => {
        	this.send([null,{payload:payload}]);
        };


        /**
		 * Logs an error message
		 * @param  {[string]} msg [error message]
		 */
        this.showsuccess = (payload) => {
        	this.send([{payload:payload},null]);
        };


        /**
		 * Shows a status visual on the node
		 * @param  {[string]} colour [colour of status (green, yellow, red)]
		 * @param  {[string]} shape [shape of symbol]
		 * @param  {[text]} text [text to show]
		 */
        this.showstatus = (colour, shape, text) => {
			this.status({fill:colour,shape:shape,text:text});
        };



        this.on('input',  (msg) => {

        	this.showstatus("yellow","dot","Making call");

	        let res = airshipsoap.call(this.wsdl, this.method, msg.payload);
	        res.then((res)=>{
	        	this.showstatus("green","dot","Success");
	         	this.showsuccess(res.booking_id.$value);
	     	}).catch((err)=>{
	        	this.showstatus("red","dot","Error");
	     		this.showerror(err);
	     	}).finally(()=>{
	     	});

	    });

     
    }
    RED.nodes.registerType("Create Booking", SoapCall);
};
