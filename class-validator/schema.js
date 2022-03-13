import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
    IsString,
} from 'class-validator';

export let UserValidationSchema = {
    name: 'myUserSchema',
    properties: {
        email: [
            {
            type: 'isEmail',
            constraints: []
            }
        ],
        password: [
            {
                type: 'minLength',
                constraints: [1]
            },
            {
                type: 'maxLength',
                constraints: [15]
            },
        ],
    },
};
