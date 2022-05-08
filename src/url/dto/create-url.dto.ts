import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsUrl, MinLength } from "class-validator";
import normalizeUrl from "./../../lib/url-normalizer";

export class CreateUrlDto {
    @ApiProperty({
        required: true,
        description: 'original URL'
    })
    @IsUrl()
    @Transform(({ value }: { value: string }) => normalizeUrl(value, { forceHttp: true }))
    @IsNotEmpty()
    originalUrl: string

    @ApiProperty({
        required: true,
        description: 'custom shortcode'
    })
    @MinLength(4)
    @IsOptional()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    shortCode?: string;
}
