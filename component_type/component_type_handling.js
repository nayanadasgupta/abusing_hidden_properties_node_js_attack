import express from 'express'
import type from 'component-type'
import { sneakyTimestamp } from './supply_chain-attack.js'

// check type of passed JSON, returns the type component type believes it is
function runComponent(payload)
{
    return new Promise((resolve, reject) => {
      resolve("Component type thinks this is: " + type(payload))
  })

}

// Call into another function to demo what a supply attack might look like
function demoSupplyChain(input)
{
    // Calling my module to attach a timestamp to this input object! Then I will type check it
    let obj = sneakyTimestamp(input);
    return ("Component type thinks this is: " + type(obj));

}

// Used to demonstrate what our fix to the component-type external value-of attack is 
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

export default {
    runComponent,
    demoValOfFix,
    demoSupplyChain
}