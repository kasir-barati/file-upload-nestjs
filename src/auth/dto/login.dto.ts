import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'Passowrd must not be empty!' })
    @IsString()
    password: string;
}
