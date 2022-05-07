/*
 * @format
 */
import { Entity, Column, Index, BeforeInsert } from "typeorm";
import { getJWT, getHash, compareHash, verifyJWT } from "../../lib/encryption";
import { IsNotEmpty, IsEmail } from 'class-validator';
import { Base } from "../../lib/entities/base";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";



@Entity({
    name: 'users'
})
export class UserEntity extends Base {
    static findByToken(token: string): Promise<UserEntity> {
        if (!token || token.length === 0) {
            return Promise.resolve(null);
        }
        let payload: { id: string };
        try {
            payload = verifyJWT(token) as any;
        } catch (e) {
            console.warn(Promise.resolve(null));
        }
        const { id } = payload;
        if (!id) {
            return Promise.resolve(null);
        }
        return UserEntity.findOne({
            where: { id }
        });
    }

    @ApiProperty()
    @Column()
    @Index({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    email: string;

    @ApiProperty()
    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    @IsNotEmpty()
    encryptedPassword: string;

    password: string;

    async comparePassword(plainString: string): Promise<boolean> {
        return await compareHash(plainString, this.encryptedPassword);
    }

    get jwt(): string {
        if (!this.id) {
            return;
        }
        return getJWT({
            id: this.id,
            name: this.name,
            email: this.email
        });
    }

    @BeforeInsert()
    async hashPassword() {
        this.encryptedPassword = await getHash(this.password);
    }
}
