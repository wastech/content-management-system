import { UserService } from './user.service';
import { Auth } from 'src/auth/entities/auth.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<Auth[]>;
    deleteUser(req: any, userId: string): Promise<{
        message: string;
    }>;
    getUser(id: string): Promise<Auth>;
}
