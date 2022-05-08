//

/*
 * @format
 */

import { ApiProperty } from "@nestjs/swagger";
import {
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

import { ObjectUtils } from "typeorm/util/ObjectUtils";

export interface IAttributes {
    [name: string]: any;
}

export abstract class Base extends BaseEntity {
    constructor(attributes?: IAttributes) {
        super();
        if (attributes) {
            ObjectUtils.assign(this, attributes);
        }
    }

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}
