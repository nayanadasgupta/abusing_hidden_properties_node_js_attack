
# Abusing Hidden Properties to Attack the Node.js Ecosystem

Implementation of Abusing Hidden Properties to Attack the Node.js Ecosystem ([Xiao et. al. 2021](https://www.usenix.org/conference/usenixsecurity21/presentation/xiao)), with examples of vulnerable code and how they can be exploited. This repository also includes linter code that outlines how some hidden property vulnerabilities can be detected. 

## Create a MySQL Database for Testing

`mysql> CREATE DATABASE sqldatabase;` 

`Query OK, 1 row affected (0.05 sec)`
 
`mysql> USE sqldatabase` 
 
`mysql> CREATE TABLE login (email VARCHAR(50), password VARCHAR(20));`
 
`mysql> SHOW TABLES;` 
 
`mysql> INSERT INTO login VALUES ('Bob@email.co.uk', 'Pass');`
`mysql> INSERT INTO login VALUES ('User2@email.co.uk', 'Pass2');`
`mysql> INSERT INTO login VALUES ('Alice@email.co.uk', 'Pass3');` 
 
`mysql> SET PASSWORD FOR root@localhost = 'compsec2';` 

**Remember to change the password back when you are done! Alternatively, you may change the password stored in class-validator/class-validator_handling.js**.


## Run Testing

1)	Download our repository and import our postman collection into postman
2)	Run the solution with `npm run dev` on the command line
3)	Run the Postman attacks.
    a)	For each attack, look at the body of the request (raw format) to see the input we are sending
    b)	First review the component type attacks:
        i)	Send the first two JSON attacks and observe the incorrect responses from component type: first "element" then "buffer"
        ii)	The second two illustrate a supply chain attack, the receiving code calls out to a malicious module to provide a timestamp on the user inputted object. When we send a typical object, component type correctly identifies it as such. When we send our malicious user input, it triggers our module to also attach the Symbol.toStringTag to the object and we trick component type into returning array instead. 
        iii)	Next is the valueOf function attack. We override the valueOf function with a string property to cause Node.js to crash in a novel DOS attack we discovered.
        iv)	Restart the solution with `npm run dev`
        v)	Finally, send the last request with also contains a valueOf function override but to our proposed mitigation code. You will instead see "mangled" returned 



    c)	JPV
        i)	Run both the JPV postman requests and observe that Validation returns true on both malicious objects
        ii)	Note: if the validation fails try running `npm install jpv@2.0.1` within visual studio on the command line, it is possible the jpv module is currently on a later version that we will attack in later steps

    d)	Bson-object-id
        i)	Send the postman request, observe that the ID is the string we provided rather than a typical long alphanumeric

    e)	Kind-of
        i)	Send the postman request, observe that it returns the type "set" rather than a generic object

    f)	Class-validator
        i)	Send the first request containing a correct user login request for an existing account, see that you receive just the account of the person you attempted to login with
        ii)	Send the second request with correctly formatted input but no matching user, and see that no user is found . 
        iii)	Send the third request with a mangled input (password is misspelled passwrd), class validator will reject the bad input without passing anything through to SQL.
        iv)	Send the last request containing constructor = false and the SQL injection attack, you will see account information for all users due to the successful SQL injection attack

    4)	Internal attacks 
        a)	Run component_type_internal_attacks.js and review the console.log output to observe the various ways to trick component type. We demonstrate overriding the Symbol.toStringTag and the valueOf function.
        `node component_type/component_type_internal_attacks.js`

        b)	Run `npm install jpv@2.2.1` to update JPV to the correct version for this internal attack. Then run the internal JPV attack and observe the console.log output to see how an internal attacker can exploit the vulnerability by setting a constructor manually. 
        `node jpv/2.2.1_JPV_internal_attack.js`

## Try Linter

- The linter code exists within `linter/lib/rules/func-check-before-constructor.js`.
- There are unit tests to ensure correct checking within `linter/tests/lib/rules/func-check-before-constructor.js`. You can run the unit tests to confirm there are no errors with o nodetests/lib/rules/func-check-before-constructor.js.
- You may uncomment a test on line 12 and run the tets again to see the response when ESLinter catches problematic code.
