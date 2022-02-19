// const schemaInspector = require('schema-inspector');

// // const nice_inputData = {
// //     "id": "54495ad94c934721ede76d90",
// //     "username": "bob",
// //     "greeting": "can we fix it?",
// //     "password": "yes we can!",
// //     "buildings": ["home", "work", "school"],
// // }

// const payloadWithoutNecessaryChanges = {
//     "id": "54495ad94c934721ede76d90",
//     "username": {"superBadStuff": true},
//     "greeting": "can we fix it?",
//     "password": "yes we can!",
//     "buildings": ["home", "work", "school"],
// }


// // const payload = {
// //     "id": "54495ad94c934721ede76d90",
// //     "username": {"superBadStuff": true, "hasOwnProperty": (elem) => {return false;}, 'constructor':String},
// //     "greeting": "can we fix it?",
// //     "password": "yes we can!",
// //     "buildings": ["home", "work", "school"],
// // }


// var sanitizationScheme = {
//     type: 'object',
//     properties: {
//         id: { type: 'string', rules: ['trim'] },
//         username: { type: 'string', rules: ['trim'] },
//         greeting: { type: 'string', rules: ['trim', 'title'] },
//         password: { type: 'string', rules: ['trim', 'title'] },
//         buildings: {
//             type: 'array',
//             splitWith: ',',
//             items: { type: 'string', rules: ['trim', 'title'] },
//         },
//     },
// };

// console.log(payloadWithoutNecessaryChanges)

// schemaInspector.sanitize(sanitizationScheme, payloadWithoutNecessaryChanges);

// console.log(payloadWithoutNecessaryChanges)


const schemaInspector = require('schema-inspector');

var user_input = {
    username: 'bob',
    greeting: "can we fix it?",
    jobs: {"hello" : 'world', "badStuff":true, "hasOwnProperty": function() {return false}, 'constructor':Array}
};

var sanitization = {
    type: 'object',
    properties: {
        firstname: { type: 'string', rules: ['trim', 'title'] },
        lastname: { type: 'string', rules: ['trim', 'title'] },
        jobs: {
            type: 'array',
            splitWith: ',',
            items: { type: 'string', rules: ['trim', 'title'] }
        },
        email: { type: 'string', rules: ['trim', 'lower'] }
    }
};

schemaInspector.sanitize(sanitization, user_input);
console.log(user_input);
