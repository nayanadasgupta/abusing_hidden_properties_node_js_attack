const express = require('express')
var type = require('component-type')

// check type of passed JSON, confirm whether the type check can be tricked
function runComponent(payload)
{
    return new Promise((resolve, reject) => {
      resolve(type(obj))
  })

}

// Demo to 
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
function demoValOf(obj)
{
    obj = obj.valueOf
    ? obj.valueOf()
    : Object.prototype.valueOf.apply(obj);
    return typeof obj;
}

module.exports = {
    demo1,
    runComponent
}