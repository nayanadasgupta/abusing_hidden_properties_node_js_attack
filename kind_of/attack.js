import kindOf from 'kind-of';

// Receives JSON input and returns what kindof believes it is
function jsonDemo(input) {
    return "Should return object, but instead returns " + kindOf(input)
}


// used for internal testing 
const objectPretendingToBeSet = {
    "id": "54495ad94c934721ede76d90",
    "username": "bob",
    "greeting": "can we fix it?",
    "password": "yes we can!",
    "constructor":{"name":"Set"}
}

// used in internal testing
function demo1() {
    console.log(kindOf(objectPretendingToBeSet));
}


export default
{
    jsonDemo
}
