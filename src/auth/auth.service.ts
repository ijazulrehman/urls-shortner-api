import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthPayload, AuthResponse, UserInfo } from './auth';
import { LoginCredentialDto } from './dto/login-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) { }

    async login(loginCredentialDto: LoginCredentialDto): Promise<AuthResponse> {

        try {
            const user = await this.usersRepository.findOne({
                where: {
                    email: loginCredentialDto.email.toLocaleLowerCase()
                }
            })

            if (!user)
                throw new UnauthorizedException('Invalid credentails');

            const isValid = await user.comparePassword(loginCredentialDto.password);

            if (!isValid)
                throw new UnauthorizedException('Invalid credentails');

            const { id, email, name } = user;
            return { id, email, name, token: user.jwt }
        } catch (err) {
            throw new UnauthorizedException('Invalid credentails');
        }

    }

    async validateUser(payload: AuthPayload): Promise<AuthPayload> {

        const user = await this.usersRepository.findOne({
            where: { email: payload.email.toLocaleLowerCase() },
        })
        if (!user) {
            throw new UnauthorizedException('You are not alowed to perform this action')
        }

        const { id, email, name } = user;

        return { id, email, name }

    }

    decodeAuthHeader(req): AuthPayload {
        const token = req.headers['Authorization'];
        return token;
    }
}
