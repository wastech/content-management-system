import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CategoryDocument, Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto, authorId: string) {
    const createdCategory = new this.categoryModel({
      ...createCategoryDto,
      author: authorId,
    });
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }
  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id);
  }

  async updateCategory(
    id: string,
    update: Partial<Category>,
  ): Promise<Category> {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async deleteCategory(id: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!category) {
      return null;
    }
    return category;
  }
}
