import { ApiProperty } from "@nestjs/swagger";
import { Base } from "./../../lib/entities/base";
import { hash6 } from "./../../lib/hash6";
import { UserEntity } from "./../../user/entities/user.entity";
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

@Entity({
    name: 'urls'
})
export class UrlEntity extends Base {

    @ApiProperty()
    @Index({ unique: true })
    @Column()
    shortCode: string

    @ApiProperty()
    @Column()
    shortUrl: string

    @ApiProperty()
    @Column()
    originalUrl: string

    @ApiProperty()
    @Column({
        type: Number,
        default: 0
    })
    clicks: number

    @ManyToOne(() => UserEntity, user => user.urls)
    @JoinColumn({
        name: 'userId'
    })
    user: UserEntity

    @BeforeInsert()
    async addH() {
        if (!this.shortCode) {
            this.shortCode = hash6();
        }

        console.log(process.env.API_HOST_URL)

        this.shortUrl = `${process.env.API_HOST_URL}/${this.shortCode}`
    }
}
