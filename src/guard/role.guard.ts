

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { currentUser } from 'src/user/decorators/current.user';

@Injectable()
export class roleGuard implements CanActivate {
          constructor (private role:string[]){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.role.includes(request.currentUser.role.toLowerCase());
  }
}