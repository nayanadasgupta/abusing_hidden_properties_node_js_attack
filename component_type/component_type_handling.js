const express = require('express')
var type = require('component-type')
var supplyAttack = require('./supply_chain-attack')

// check type of passed JSON, confirm whether the type check can be tricked
function runComponent(payload)
{
    return new Promise((resolve, reject) => {
      resolve("Component type thinks this is: " + type(payload))
  })

}

function demoSupplyChain(input)
{
    // Calling my module to attach a timestamp to this input object! Then I will type check it
    let obj = supplyAttack.supplyAttack(input);
    return ("Component type thinks this is: " + type(obj));

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
    runComponent,
    demoValOfFix,
    demoSupplyChain
}