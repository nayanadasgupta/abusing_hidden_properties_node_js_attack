import type from 'component-type';

demo1()

// Do a long demo of how component-type can be tricked by internal attackers
function demo1() {
    // validated how component-type works
    var check = new testPollution();
    var dateObj = new Date;
    console.log("This is the component type result on a date object")
    console.log("   " + type(dateObj))

    console.log("Now lets override it's toStringTag")
    console.log("   obj[Symbol.toStringTag] = 'Array';");
    dateObj[Symbol.toStringTag] = 'Array';
    console.log("component type will now return array for the date object!");
    console.log("   " + type(dateObj));

    console.log("\n\n");
    console.log("This is a custom made polluted object, we overode its toStringTag in the constructor");
    let polluted = new testPollution();
    console.log("   let polluted = new testPollution();")
    console.log("So component type returns: " + type(polluted));

    console.log("\n\n");
    console.log("Now lets see how overriding valueOf works");

    let valueOfPol = new vals();
    console.log("   let valueOfPol = new vals();");
    console.log("   vals.prototype.valueOf = function () { return true; };");
    vals.prototype.valueOf = function () { return true; };
    console.log("component type says vals is:  " + type(valueOfPol))

    console.log("\n\n");
}

// Example of how a constructor for an object can set its toStringTag to a different value
class testPollution {
    constructor() {
        Object.defineProperties(this, {
            [Symbol.toStringTag]: {
                value: "Array",
                writable: true
            }
        });
        this.valueOf = function valueOf() { return true; };
    }
}

// empty class used to show the value of attack by an internal or supply chain adversary
class vals {
    constructor() { }

}





