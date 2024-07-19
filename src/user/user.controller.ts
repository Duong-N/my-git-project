import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDtos } from './dtos/createUser.Dto';
import { registerUserDtos } from './dtos/register.Dtos';
import { authService } from './auth.service';
import { loginUserDtos } from './dtos/login';
import { AuthGuard } from 'src/guard/auth.guard';
import { get } from 'https';
import { currentUser } from './decorators/current.user';
import { User } from './user.entities';
import { roleGuard } from 'src/guard/role.guard';



@Controller('/api/v1/user')
@UseInterceptors(ClassSerializerInterceptor)

export class UserController {
          constructor(private userService: UserService,private authService:authService ) { }


          @Post()
          create(@Body() createUserDto: createUserDtos) {
                    return 'This action adds a new user';
          }
          
          @Get()
          @UseGuards(new roleGuard(["user","admin"]))
          @UseGuards(AuthGuard)
          getAllUser() {
                    return this.userService.findAll();
          }
          @Get("/current_User")
          @UseGuards(AuthGuard)
          getcurrentUser(@currentUser() currentUser:User)
          {
                    return currentUser;
          }

          

          @Get("/:id")
          getUser(@Param("id", ParseIntPipe) id: number) {
                    return this.userService.findById(id);
          }

          @Put("/:id")
          updateUser(@Param("id", ParseIntPipe) id: number, @Body() requestBody: registerUserDtos) {
                    return this.userService.updateById(id, requestBody);

          }
          @Delete("/:id")
          deleteUser(@Param("id", ParseIntPipe) id: number) {
                    return this.userService.deleteById(id);
          }
          @Post("/register")
          registerUser(@Body() requestBody:registerUserDtos)
          {
                    return this.authService.register(requestBody);

          }
          @Post("/login")
          loginUser(@Body() requestBody:loginUserDtos)
          {
                    return this.authService.login(requestBody)
          }

}
