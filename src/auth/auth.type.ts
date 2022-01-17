import { IsNotEmpty, IsString } from 'class-validator';

export class AppToken {
    @IsNotEmpty()
    @IsString()
    accessToken: string;
}
