import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { registerUserDtos } from "./dtos/register.Dtos";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';
import { loginUserDtos } from "./dtos/login";
@Injectable()

export class authService{
         constructor(private jwtService:JwtService,private userService:UserService){}
         async register(requestBody:registerUserDtos)
          {

                    //check email exist
                const userByEmail = await this.userService.findByEmail(requestBody.email);
                if (userByEmail)
                {
                    throw new BadRequestException("email already exist!");
                }

                // hash password
                const hashPassword = await bcrypt.hash(requestBody.password, 10);
                requestBody.password = hashPassword;
                //save to database
                const saveUser = this.userService.create(requestBody);
                // jwt token
                const payLoad ={
                    id : (await saveUser).id,
                    firstName : (await saveUser).firstName,
                    lastName : (await saveUser).lastName,
                    email:(await saveUser).email,
                    role : (await saveUser).role,
                };
                const access_token = await this.jwtService.signAsync(payLoad,{secret:process.env.JWT_SECRET});
                return {
                    msg:"user has been created",
                    access_token,
                }
          }
          //check email:


          async login(requestBody:loginUserDtos)
          {
                    const userByEmail = await this.userService.findByEmail(requestBody.email);
                    if (!userByEmail)
                    {
                              throw new BadRequestException("khong tong tai!");
                    }
                    //check password:
                    const comparePassword = await bcrypt.compare(requestBody.password,userByEmail.password);
                    if (!comparePassword)
                    {
                              throw new BadRequestException("sai tai khoan hoac mat khau!");
                    }
                    const payLoad ={
                              id : (await userByEmail).id,
                              firstName : (await userByEmail).firstName,
                              lastName : (await userByEmail).lastName,
                              email: userByEmail.email,
                              role : (await userByEmail).role,
                          };
                          const access_token = await this.jwtService.signAsync(payLoad,{secret:process.env.JWT_SECRET});
                          return {
                              msg:"user has been login",
                              access_token,
                          }
          }
          

}
