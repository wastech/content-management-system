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

  /**
   * Retrieves all users in the system. Requires admin role.
   * @returns {Promise<Auth[]>} A list of all users in the system.
   * @throws {UnauthorizedException} If the user does not have admin role.
   */
  @Get()
  @Roles(Role.Admin)
  async findAll(): Promise<Auth[]> {
    return this.userService.findAll();
  }

  /**
   * Deletes a user by ID.
   * @param {Request} req - The request object.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Object} An object with a success message.
   * @throws {UnauthorizedException} If the user is not authorized to delete users.
   */
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

  // Retrieves a user by their ID
  // @param {string} id - The ID of the user to retrieve
  // @returns {Promise<Auth>} The user with the specified ID
  // @throws {NotFoundException} If the user with the specified ID is not found
  @Get(':id') // Defines a new route with a dynamic parameter "id"
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Guest) // Allows both admin and regular users to access this route
  async getUser(@Param('id') id: string): Promise<Auth> {
    return this.userService.getUser(id); // Calls the "getUser" method in the "AuthService" and returns the result
  }
}
