const express = require('express')
const jpv = require('jpv')


// Bypass check on 2.0.1 for map validation
function checkJPVMapOrig(input)
{
	var mapPattern = 
	{
		should_be_map: new Map()
	}

	return ("Validation bypassed: " + jpv.validate(input, mapPattern));
}

// Bypass check on 2.0.1 for array validation
function checkJPVArrayOrig(input)
{
	var arrayPattern = {
		should_be_array: []
	};

	return ("Validation bypassed: " + jpv.validate(input, arrayPattern));
}



/// Debugging aids

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

module.exports = {
   checkJPVMapOrig,
   checkJPVArrayOrig,
}