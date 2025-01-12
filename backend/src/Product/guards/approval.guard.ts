import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IsApprovedOrIsAdmin implements CanActivate {
    
  canActivate(context:ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user;

    if(!user) false
    if(user.isApproved === true) return true
    return false
  }
}