//

import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { AuthResponse } from "../auth";

export class AuthReponseEntity implements AuthResponse {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    token: string;
}