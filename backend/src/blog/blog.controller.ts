import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Request,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/entities/auth.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Guest)
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @Request() req,
  ): Promise<Blog> {
    return this.blogService.create(createBlogDto, req.user);
  }

  @Get()
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.blogService.findAll(page, limit);
  }
}
