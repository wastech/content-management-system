import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  HttpStatus,
  HttpException,
  NotFoundException,
  Request,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/entities/auth.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Guest)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req,
  ): Promise<Category> {
    return await this.categoryService.createCategory(
      createCategoryDto,
      req.user._id,
    );
  }

  @Public()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Public()
  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Public()
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() update: Partial<Category>,
  ) {
    const category = await this.categoryService.updateCategory(id, update);
    return category;
  }

  @Public()
  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    const category = await this.categoryService.deleteCategory(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return { message: `Category with ID ${id} successfully deleted` };
  }
}
