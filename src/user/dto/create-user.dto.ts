
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        required: true,
        description: "User's emil",
    })
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    email: string;

    @ApiProperty({
        description: "User's name",
        required: false
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @ApiProperty({
        required: true,
        description: "User's password"
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
