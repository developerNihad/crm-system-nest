import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
    @Type()
    @IsEmail()
    @ApiProperty({ default: 'john.doe@example.com' })
    email: string;

    @Type()
    @IsString()
    @ApiProperty({ default: 'Password' })
    password: string;
}
