const kindOf = require('kind-of');



const objectPretendingToBeSet = {
    "id": "54495ad94c934721ede76d90",
    "username": "bob",
    "greeting": "can we fix it?",
    "password": "yes we can!",
    "constructor":{"name":"Set"}
}

function demo1() {
    console.log(kindOf(objectPretendingToBeSet));
}

function jsonDemo(input) {
    return "Should return object, but instead returns " + kindOf(input)
}

module.exports =
{
    jsonDemo
}
