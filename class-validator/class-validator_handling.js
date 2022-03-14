// import { UserValidationSchema } from "./schema.js";
// registerSchema(UserValidationSchema);
import { UserSchema } from "./schema.js";
import { validate } from "class-validator";
import { createConnection } from 'mysql2';

// Handle the user sent over via JSON
function jsonHandle(emailInput) {
    let requirements = {
        host: 'localhost',
        user: 'root',
        password: 'compsec2',
        database: 'sqldatabase'
    };
    var connection = createConnection(requirements);
    console.log(emailInput);
    console.log(UserSchema);

    let schema = new UserSchema();
    schema.email = '';
    schema.password = '';

    let test1Param = Object.assign(schema, emailInput);
    console.log("This is the merged schema:")
    console.log(test1Param);

    return new Promise(function (resolve, reject) {
        validate(test1Param).then((errors) => {
            if (errors.length > 0) {
                console.log('invalid email and or password, unable to validate user', errors);
                resolve("Class validator failed to validate user ");
            } else {
                console.log('valid email and password, user successfully validated. Relevant Database Information:');
                login(test1Param.email, test1Param.password, connection).then((results) => {

                    if (results.length == 0) {
                        resolve("No user found");

                    }
                    resolve(results);
                })
            }
            connection.end();
        });
    });
}

// Login function for inputs that passed validation
function login(emailInput, passwordInput, connection) {
    const sqlquery1 = `SELECT * FROM login WHERE email = '${emailInput}' AND password = '${passwordInput}'`;
    console.log(sqlquery1);
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


export default {
    jsonHandle
}
