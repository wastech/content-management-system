import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './entities/auth.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto): Promise<{
        user: Auth;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: {
            token: string;
            user: Auth;
        };
    }>;
    getProfile(req: any): any;
    updateUser(id: string, UpdateAuthDto: any, req: any): Promise<Auth>;
    changePassword(oldPassword: string, newPassword: string, req: any): Promise<Auth>;
}
