
import { Injectable, CanActivate, ExecutionContext, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
          constructor(private jwtService: JwtService, private userService: UserService) { }


          async canActivate(context: ExecutionContext): Promise<boolean> {
                    const request = context.switchToHttp().getRequest();
                    try {
                              //step
                              // 1 get token from header
                              const token = request.headers.authorization.split(' ')[1];

                              if (!token) {
                                        throw new ForbiddenException("cung cap token vao day");
                              }

                              // 2 jwtverify validate token
                              const payLoad = await this.jwtService.verifyAsync(token, {
                                        secret: process.env.JWT_SECRET
                              });
                              // 3 tim user trong data base dua tren token 
                              const userEmail = await this.userService.findByEmail(payLoad.email);
                              if (!userEmail) {
                                        throw new BadRequestException("Not found!");
                              }

                              // 4 gan user vao request
                              request.currentUser = userEmail;

                             
                    } catch (error) {
                             throw new ForbiddenException("token co the het han!");

                    }
                    return true;
          }
}