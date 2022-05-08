//

import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { AuthResponse } from "../auth";

export class AuthReponseEntity implements AuthResponse {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    token: string;
}