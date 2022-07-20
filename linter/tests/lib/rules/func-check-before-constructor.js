const rules = require("../../../lib/rules/func-check-before-constructor.js");

const RuleTester = require("eslint").RuleTester;
const ruleTester = new RuleTester();

const errors = [{ messageId: "unexpected" }];

const funcCheckBeforeConstructor = rules["func-check-before-constructor"];

ruleTester.run("func-check-before-constructor", funcCheckBeforeConstructor, {
    valid: [
        // Uncomment to see the linter detect an error
        // {
        //     code: "constructor.name",
        //     errors,
        // },
        {
            code: 'typeof constructor === "function" && constructor.name',
            errors,
        },
        {
            code: 'typeof constructor == "function" && constructor.name',
            errors,
        },
        {
            code: 'typeof constructor ===  "function" && constructor.id',
            errors,
        },
        {
            code: 'typeof constructor ==  "function" && constructor.id',
            errors,
        },
        {
            code: "constructor",
            errors,
        },

    ],
    invalid: [
        {
            code: "constructor.name",
            errors, 
        },
        {
            code: "constructor.id",
            errors, 
        },
        {
            code: "CHECK && constructor.id",
            errors, 
        },
        {
            code: "typeof constructor == \"function\" || constructor.id",
            errors, 
        },
        ], 
    });