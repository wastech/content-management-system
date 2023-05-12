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
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/entities/auth.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CommentService } from 'src/comment/comment.service';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('blogs')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly commentService: CommentService,
  ) {}

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

  @Public()
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

  @Public()
  @Get(':id/similar')
  async findSimilarBlogs(@Param('id') id: string): Promise<Blog[]> {
    const blog = await this.blogService.getPostById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const similarBlogs = await this.blogService.findSimilarBlogs(blog);

    return similarBlogs;
  }

  @Public()
  @Get('/author/:authorId')
  async getBlogsByAuthor(@Param('authorId') authorId: string): Promise<Blog[]> {
    const blogs = await this.blogService.getBlogsByAuthor(authorId);
    return blogs;
  }

  @Public()
  @Get('category/:categoryName')
  async getBlogsByCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<Blog[]> {
    return this.blogService.findByCategory(categoryName);
  }

  @Public()
  @Get('tags')
  async getAllTags() {
    const tags = await this.blogService.getAllTags();
    const formattedTags = tags.map((tag) => ({
      name: tag.name,
      count: tag.count,
    }));
    return { tags: formattedTags };
  }

  @Public()
  @Get('tag/:tag')
  async getPostsByTag(@Param('tag') tag: string) {
    const posts = await this.blogService.getPostsByTag(tag);
    console.log('object', tag);
    return { posts };
  }

  @Patch(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdateBlogDto,
    @Req() req: any,
  ) {
    const post = await this.blogService.getPostById(id);
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }

    const user = req.user;
    if (
      post.author.toString() !== user._id.toString() &&
      user.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        `You are not authorized to update this post`,
      );
    }

    const updatedPost = await this.blogService.updatePost(id, updatePostDto);
    return {
      message: `Blog post with ID ${id} updated successfully`,
      post: updatedPost,
    };
  }

  @Public()
  @Get('query')
  async search(@Query('q') query: string) {
    const results = await this.blogService.search(query);
    return results;
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string, @Req() req: any) {
    const post = await this.blogService.getPostById(id);
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }

    const user = req.user;
    if (
      post.author.toString() !== user._id.toString() &&
      user.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        `You are not authorized to delete this post`,
      );
    }
    await this.commentService.deleteManyByPostId(id);
    await this.blogService.deletePost(id);
    return { message: `Blog post with ID ${id} deleted successfully` };
  }
}
