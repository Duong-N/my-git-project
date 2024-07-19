import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entities';
import { authService } from './auth.service';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
   JwtModule.register({
    global: true,
    signOptions: { expiresIn: '1d' },
  }),],
  providers: [UserService, authService],
  controllers: [UserController]
})
export class UserModule { }
