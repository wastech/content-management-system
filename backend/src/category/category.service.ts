import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
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

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
