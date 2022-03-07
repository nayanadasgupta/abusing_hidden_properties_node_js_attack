const express = require('express')
var type = require('component-type')

// check type of passed JSON, confirm whether the type check can be tricked
function runComponent(payload)
{
    return new Promise((resolve, reject) => {
      resolve("Component type thinks this is: " + type(payload))
  })

}

// Demo to 
function demo1()
{
  // validated how component-type works
  var dateObj = new Date;
  var toString = Object.prototype.toString;

  var returnObj = {}; // empty Object
  var key = 'Malicious';
  returnObj["dateObj"] = dateObj; // empty Array, which you can push() values into
  //obj2 = 'String.prototype[Symbol.toStringTag] = \'prototype polluted\';';

  
  returnObj["type(dateObj)"]= type(dateObj);
  returnObj["Manipulate the dateObj"] = "obj[Symbol.toStringTag] = 'Array';";
  dateObj[Symbol.toStringTag] = 'Array';
  returnObj["new type(dateObj)"] = type(dateObj)


  let polluted = new testPollution();
  console.log(Object.prototype.toString.call(polluted));
  console.log(type(polluted));
  console.log("check value of");

  let valueOfPol = new vals();
  vals.prototype.valueOf = function() { return true; };
  //console.log(valOf(valueOfPol));
  console.log(type(valueOfPol));

  // experimenting
  var malicious = "class testPollution { get [Symbol.toStringTag]() { return \"Array\"; } } ";

  //var valOfPolStr = type(valOfPol);
  console.log(returnObj);

  return new Promise((resolve, reject) => {
      resolve(returnObj)
  });

}


class testPollution
{        
    constructor()
    {
        Object.defineProperties(this, {
          [Symbol.toStringTag]: {
            value: "Array",
            writable: true
          }});
          
          //this.check = function() {return "array"};
          //this.prototype.valueOf= 1;
        this.check = 1;
        //this.prototype.toString = function() {return "array"}
        toString: () => {
            return "Array"
        }

        //var check =  function() {return "array"};
       

        this.valueOf = function valueOf() { return true; };
    }     
}

class vals
{
    constructor(){}
  
}

function demo2()
{
    const myDate = new Date();
    console.log(Object.prototype.toString.call(myDate));     // [object Date]

    myDate[Symbol.toStringTag] = 'myDate';
    console.log(Object.prototype.toString.call(myDate));     // [object myDate]

    Date.prototype[Symbol.toStringTag] = 'prototype polluted';
    console.log(Object.prototype.toString.call(new Date())); // [object prototype polluted]

    console.log(Object.prototype.toString(Object.prototype.toString()));
}

/// debugging aid function for testing 
function demoValOfFix(obj)
{
    if (typeof obj.valueOf === 'function')
    {
        obj = obj.valueOf
        ? obj.valueOf()
        : Object.prototype.valueOf.apply(obj);
        return typeof obj;
    }
    else
    {
        return "Mangled";
    }

}

module.exports = {
    demo1,
    runComponent,
    demoValOfFix
}