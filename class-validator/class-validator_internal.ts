import { registerSchema } from "class-validator";
// import { UserValidationSchema } from "./schema.js";
// registerSchema(UserValidationSchema);
import { UserSchema } from "./schema"
import { validate } from "class-validator";
import { createConnection } from 'mysql2';
import { plainToClass, plainToInstance } from 'class-transformer'


let requirements = {
    host: 'localhost',
    user: 'root',
    password: 'compsec2',
    database: 'sqldatabase'
};

const connection = createConnection(requirements);
function bypassedValidation(emailInput, passwordInput) {
    const sqlquery1 = `SELECT * FROM login WHERE email = ${emailInput} AND password = ${passwordInput}`;
    connection.query(sqlquery1, function(error, rows) {
        if (error) throw error;
        console.log(rows);
    });
    }

let schema = new UserSchema();
schema.email = '';
schema.password = '';

      let param = {
        email: '" OR 1=1--',
        password: '" OR 1=1--',
        constructor: false
    };

let test1Param = Object.assign(schema, param);
console.log(test1Param);

validate(test1Param).then(errors => {
    if (errors.length > 0) {
      console.log('email and or password of wrong form', errors);
    } else {console.log('email and password of correct form input');
      bypassedValidation(test1Param.email, test1Param.password);
}
});


// let schema2 = new UserSchema();
// schema2.email = '';
// schema2.password = '';

// let ryn = {
//     email: 'User2@email.co.uk',
//     pssword: 'Paass2',
//     incorrectField: 'I shouldnt be here',
//     constructor: false
// };

// let rynParam = Object.assign(schema2, ryn);
// console.log(rynParam);


// validate(rynParam).then(errors => {
// if (errors.length > 0) {
//   console.log('email and or password of wrong form', errors);
// } else {console.log('email and password of correct form input');
//   bypassedValidation(rynParam.email, rynParam.password);
// }
// });