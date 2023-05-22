import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth, AuthDocument } from './entities/auth.entity';
export declare class AuthService {
    private readonly authModel;
    private jwtService;
    constructor(authModel: Model<AuthDocument>, jwtService: JwtService);
    register(createUserDto: CreateAuthDto): Promise<Auth>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        user: Auth;
    }>;
    findById(_id: string): Promise<Auth>;
    updateUser(userId: string, updateUserDto: UpdateAuthDto, user: Auth): Promise<Auth>;
    updateUserPassword(userId: string, oldPassword: string, newPassword: string): Promise<Auth>;
}
