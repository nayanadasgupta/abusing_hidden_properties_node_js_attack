const cloneDeep = require('clone-deep');

const payload = {
    "length": 100,
    "buffer": Buffer.from("WOOO"),
    "byteOffset": 0,
    "constructor":{"name":"Int8Array"}
}

let copy = cloneDeep(payload);
