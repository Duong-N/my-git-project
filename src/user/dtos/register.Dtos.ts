import { IsEmail, IsNotEmpty } from 'class-validator';

export class registerUserDtos
{
          @IsEmail()
          @IsNotEmpty()
          email: string;
          
          @IsNotEmpty()
          firstName: string;

          @IsNotEmpty()
          lastName: string;


          @IsNotEmpty()
          password:string;
}