import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import typeOrmConfig from './../typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UrlEntity]),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    UrlModule
  ],
  controllers: [UrlController],
  providers: [UrlService]
})
export class UrlModule { }
