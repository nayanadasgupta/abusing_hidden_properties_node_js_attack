var mysql = require('mysql2');
var classValidator = require('class-validator');
//var mysql = require('mysql2/promise')

function bypassedValidation(emailInput, passwordInput, connection) {
    const sqlquery1 = `SELECT * FROM login WHERE email = ${emailInput} AND password = ${passwordInput}`;
    return new Promise(function (resolve, reject) {
        connection.query(sqlquery1, function (error, rows) {
            if (error) {
                reject(new Error(error))
            }
            else {
                resolve(rows);
            }

        });
    });

}
class intendedSchema {
    email;
    password
}

let param = {
    email: ' " OR 1=1--',
    password: ' " OR 1=1--',
    constructor: false
};



function jsonHandle(emailInput)
{
    console.log("into the json");
    let requirements = {
        host: 'localhost',
        user: 'root',
        password: 'compsec2',
        database: 'sqldatabase'
    };
    var connection = mysql.createConnection(requirements);

    let test1Param = Object.assign(intendedSchema, param);
    console.log("This is the merged schema:")
    console.log(test1Param);


    return new Promise(function (resolve, reject) {
        classValidator.validate(test1Param).then((errors) => {
            if (errors.length > 0) {
                console.log('invalid email and or password, unable to validate user', errors);
                resolve("Class validator failed to validate user ");
            } else {
                console.log('valid email and password, user successfully validated. Relevant Database Information:');
                bypassedValidation(test1Param.email, test1Param.password, connection).then((results) => {
                    resolve(results);  
                })

            }
        });
    });

}

module.exports = {
    jsonHandle
}