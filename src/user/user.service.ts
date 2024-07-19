import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDtos } from './dtos/createUser.Dto';
import { registerUserDtos } from './dtos/register.Dtos';

@Injectable()
export class UserService {
          constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
          

          //CRUD
          create(requestBody: registerUserDtos) {
                    const user = this.userRepo.create(requestBody);
                    return this.userRepo.save(user);
 
          }

          findAll()
          {
                    return this.userRepo.find();
          }

          findById(id:number)
          {
                    return this.userRepo.findOneBy({id});
          }
          findByEmail(email:string)
          {
                    return this.userRepo.findOneBy({email});
          }

          async updateById(id:number,requestBody:registerUserDtos)
          {
                   let user = await this.findById(id);
                   if (!user)
                   {
                    throw new NotFoundException("ko ton tai");
                   }

                   user = {...user,...requestBody};

                   return this.userRepo.save(user);

          }
          deleteById(id:number)
          {
                    return this.userRepo.delete({id});

          }
}
