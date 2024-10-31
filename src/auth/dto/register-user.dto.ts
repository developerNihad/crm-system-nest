import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
    @Type()
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @Type()
    @ApiProperty()
    @IsEmail()
    email: string;

    @Type()
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @Type()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    role: string;
}
