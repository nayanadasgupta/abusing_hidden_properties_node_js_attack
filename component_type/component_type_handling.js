const express = require('express')
var type = require('component-type')

function runComponent(payload)
{
    console.log(payload);

    var obj = payload;
    //console.log(Object.prototype.toString.call(payload));
    //console.log(type(obj.Symbol.toStringTag));
    console.log(obj['toStringTag']);

    console.log("list all fields");
    for(var propertyName in obj) {
   // propertyName is what you want
   // you can get the value like this: myObject[propertyName]
        console.log("property name: " + propertyName + " : " + obj[propertyName]);
    }
    var objSymbols = Object.getOwnPropertySymbols(obj);
    console.log(objSymbols);
    
    console.log(obj["[Symbol.toStringTag]"]);

    console.log("check my testPollution class");
    let polluted = new testPollution();
     for(var propertyName in polluted) {
    // propertyName is what you want
    // you can get the value like this: myObject[propertyName]
        console.log("property name: " + propertyName + " : " + testPollution[propertyName]);
    }
    console.log("end of properties");
    console.log(JSON.stringify(polluted));
    //console.log(type(polluted));
    var objectSymbols = Object.getOwnPropertySymbols(polluted);
    //console.log(objectSymbols);

    console.log(valOf(polluted));

     return new Promise((resolve, reject) => {
      resolve(type(obj))
  })

}


function demo1()
{
  // validated how  component-type works
  var obj = new Date;
  var toString = Object.prototype.toString;
  console.log(type(obj));

  var o = {}; // empty Object
  var key = 'Malicious';
  o[key] = new Date(); // empty Array, which you can push() values into
  //obj2 = 'String.prototype[Symbol.toStringTag] = \'prototype polluted\';';
  obj3 = 'new Date(); Date.prototype';

  

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

  return new Promise((resolve, reject) => {
      resolve(type(valueOfPol))
  })

}

function valOf(obj)
{
    obj = obj.valueOf
    ? obj.valueOf()
    : Object.prototype.valueOf.apply(obj);
    return typeof obj;
}

class testPollution
{    
    //var check =  function() {return "array"};
    get prop3() {
    return "array";
     }
     val() { return array; }

    
    constructor()
    {
        /* Object.defineProperties(this, {
          [Symbol.toStringTag]: {
            value: "Array",
            writable: true
          }});
          */
          //this.check = function() {return "array"};
          //this.prototype.valueOf= 1;
        this.check = 1;
        //this.prototype.toString = function() {return "array"}
        toString: () => {
            return "Array"
        }

        this.valueOf = function valueOf() { return ["",""]; };
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

module.exports = {
    demo1,
    runComponent
}