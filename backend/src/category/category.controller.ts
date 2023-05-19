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
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/entities/auth.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Creates a new category.
   * @param {CreateCategoryDto} createCategoryDto - The data needed to create a new category.
   * @param {Request} req - The request object.
   * @returns {Promise<Category>} The newly created category.
   */
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

  /**
   * Retrieves all categories.
   * @returns {Promise<Category[]>} A list of all categories.
   */
  @Public()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  /**
   * Retrieves a category by ID.
   * @param {string} id - The ID of the category to retrieve.
   * @returns {Promise<Category>} The category matching the ID.
   */
  @Public()
  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  /**
   * Update a category by ID.
   *
   * @param {string} id - The ID of the category to update.
   * @param {Partial<Category>} update - The updates to apply to the category.
   * @returns {Promise<Category>} The updated category.
   */
  @Public()
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() update: Partial<Category>,
  ) {
    const category = await this.categoryService.updateCategory(id, update);
    return category;
  }

  /**
   * Deletes a category by ID
   * @param {string} id - The ID of the category to delete
   * @returns {Promise<{ message: string }>} A message indicating whether the category was successfully deleted
   * @throws {NotFoundException} If no category with the specified ID is found
   */
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
