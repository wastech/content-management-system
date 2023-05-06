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
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/entities/auth.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Guest)
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBlogDto: CreateBlogDto,
    @Request() req,
  ): Promise<Blog> {
    console.log('req:'); // log the file parameter
    try {
      console.log('file:', file); // log the file parameter
      createBlogDto.imageUrl = file.path;

      const savedBlogPost = await this.blogService.create(
        createBlogDto,
        req.user,
      );
      savedBlogPost.imageUrl = `${req.protocol}://${req.get('host')}/${
        savedBlogPost.imageUrl
      }`;

      return savedBlogPost;
    } catch (error) {
      console.error(error.message);
      throw new HttpException(
        'Error creating blog post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.blogService.findAll(page, limit);
  }

  @Public()
  @Get(':id/:category/:slug')
  async getPostByIdCategoryAndSlug(
    @Param('id') id: string,
    @Param('category') category: string,
    @Param('slug') slug: string,
  ): Promise<Blog> {
    const post = await this.blogService.findByIdCategoryAndSlug(
      id,
      category,
      slug,
    );

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
