//

import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"

export class LoginCredentialDto {
    @ApiProperty({
        required: true,
        description: 'Email of user'
    })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    readonly email: string

    @ApiProperty({
        required: true,
        description: 'Password of user'
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string
}