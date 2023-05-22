import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    private readonly authService;
    constructor(jwtService: JwtService, reflector: Reflector, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
