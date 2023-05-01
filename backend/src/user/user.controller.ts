import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Request,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/auth/entities/auth.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.Admin)
  async findAll(): Promise<Auth[]> {
    return this.userService.findAll();
  }

  @Delete(':userId')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteUser(@Request() req, @Param('userId') userId: string) {
    const deletedUser = await this.userService.deleteUser(
      userId,
      req.user.role,
    );
    return {
      message: `User ${deletedUser.name} has been deleted successfully!`,
    };
  }

  @Get(':id') // Defines a new route with a dynamic parameter "id"
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Guest) // Allows both admin and regular users to access this route
  async getUser(@Param('id') id: string): Promise<Auth> {
    return this.userService.getUser(id); // Calls the "getUser" method in the "AuthService" and returns the result
  }
}
