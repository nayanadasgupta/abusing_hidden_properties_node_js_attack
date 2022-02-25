const kindOf = require('kind-of');

const objectPretendingToBeSet = {
    "id": "54495ad94c934721ede76d90",
    "username": "bob",
    "greeting": "can we fix it?",
    "password": "yes we can!",
    "constructor":{"name":"Set"}
}

console.log(kindOf(objectPretendingToBeSet));


