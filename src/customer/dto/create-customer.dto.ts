import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
    @Type()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    companyName: string;

    @Type()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    contactPerson: string;

    @Type()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string;
}