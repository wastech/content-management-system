import { Model } from 'mongoose';
import { Auth, AuthDocument } from 'src/auth/entities/auth.entity';
import { Role } from 'src/auth/entities/auth.entity';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<AuthDocument>);
    findAll(): Promise<Auth[]>;
    deleteUser(userId: string, userRole: Role): Promise<Auth>;
    getUser(id: string): Promise<Auth>;
}
