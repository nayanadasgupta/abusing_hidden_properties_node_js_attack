import { validate, ValidationSchema, IsEmail, IsAlphanumeric, MinLength, MaxLength, IsEmpty, IsNotEmpty, Length } from 'class-validator';
export class UserSchema {
    @IsEmail()
    email: string;

    @MinLength(5)
    @MaxLength(15)
    password: string;

}