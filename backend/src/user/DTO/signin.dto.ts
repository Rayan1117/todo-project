import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class SignInDTO {
        @IsNotEmpty()
        @IsEmail()
        email: string
    
        @IsNotEmpty()
        @IsStrongPassword({ minLength: 8, minUppercase: 0 })
        password: string
    
}