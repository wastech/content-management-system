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
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/entities/auth.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { CommentService } from '../comment/comment.service';
import { MongoError } from 'mongodb';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('blogs')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly commentService: CommentService,
  ) {}

  /**
   * Creates a new blog post with the given details and image file.
   *
   * This method requires the user to have admin or guest role. It accepts a file object containing the image and a DTO object containing the blog post details. It returns the created blog post with a URL to the uploaded image.
   *
   * @param {Express.Multer.File} file - The image file to upload.
   * @param {CreateBlogDto} createBlogDto - The DTO object containing the blog post details.
   * @param {Request} req - The Express request object containing the user details.
   * @returns {Promise<Blog>} - The created blog post with a URL to the uploaded image.
   * @throws {HttpException} - If there is an error creating the blog post.
   */
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Guest)
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBlogDto: CreateBlogDto,
    @Request() req,
  ): Promise<Blog> {
    try {
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
      if (error instanceof MongoError && error.code === 11000) {
        throw new Error('Slug already exists');
      } else {
        throw error;
      }
    }
  }

  /**
   * This endpoint is publicly accessible and returns a paginated list of all blog posts.
   *
   * @param page - The page number to retrieve (default: 1)
   * @param limit - The number of items per page (default: 10)
   * @returns A paginated list of blog posts.
   */
  @Public()
  @Get()
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.blogService.findAll(page, limit);
  }

  @Public()
  @Get('published')
  async getPublishedPosts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.blogService.getPublishedPosts(page, limit);
  }

  @Public()
  @Get('featured')
  async getFeaturedPosts(): Promise<Blog[]> {
    return this.blogService.findFeaturedPosts();
  }
  /**
   * Retrieves a blog post by ID, category, and slug.
   * @param {string} id - The ID of the blog post.
   * @param {string} category - The category of the blog post.
   * @param {string} slug - The slug of the blog post.
   * @returns {Promise<Blog>} The blog post matching the ID, category, and slug.
   * @throws {NotFoundException} If no blog post is found.
   */
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

  /**
   * Retrieves a list of blog posts that are similar to the specified blog post.
   *
   * This method is accessible without authentication and takes an ID parameter from the request URL. It uses the ID to retrieve the specified blog post from the BlogService, and then calls the BlogService method findSimilarBlogs to find other blog posts that are similar to it. The method returns a list of the similar blog posts.
   *
   * @param {string} id - The ID of the blog post to find similar posts for.
   * @returns {Promise<Blog[]>} - A list of blog posts that are similar to the specified blog post.
   * @throws {NotFoundException} - If the specified blog post does not exist.
   */
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

  /**
   * Retrieves all the blogs written by the author with the specified ID.
   *
   * This method is marked as public and accessible to all users. It takes an author ID parameter from the request URL and uses it to query the BlogService for all blogs written by the specified author. It returns an array of Blog objects.
   *
   * @param {string} authorId - The ID of the author to retrieve blogs for.
   * @returns {Promise<Blog[]>} - An array of Blog objects written by the specified author.
   */
  @Public()
  @Get('/author/:authorId')
  async getBlogsByAuthor(@Param('authorId') authorId: string): Promise<Blog[]> {
    const blogs = await this.blogService.getBlogsByAuthor(authorId);
    return blogs;
  }

  /**
   * Returns an array of blog posts that belong to the specified category.
   * This method is accessible to all users without authentication. It takes the category name as a parameter and queries the BlogService for all blog posts that belong to that category. The method returns an array of blog posts.
   * @param {string} categoryName - The name of the category to query.
   * @returns {Promise<Blog[]>} - An array of blog posts that belong to the specified category.
   * @throws {none}
   */
  @Public()
  @Get('category/:categoryName')
  async getBlogsByCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<Blog[]> {
    return this.blogService.findByCategory(categoryName);
  }

  /**
   * Retrieves all tags and their count from the blog service and returns them in a formatted object.
   *
   * This method is decorated with @Public() to indicate that it is accessible without authentication.
   *
   * @returns {Object} - An object containing an array of formatted tag objects.
   * @throws - If there is an error retrieving the tags.
   */
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

  /**
   * Retrieves all posts that have the given tag.
   * @param tag The tag to search for.
   * @returns An array of posts.
   */
  @Public()
  @Get('tag/:tag')
  async getPostsByTag(@Param('tag') tag: string) {
    const posts = await this.blogService.getPostsByTag(tag);
    return { posts };
  }

  /**
   * Endpoint to update a blog post by ID.
   *
   * This endpoint requires the user to have admin or author role. It accepts the ID of the post,
   * a DTO object containing the updated details of the post, and the request object containing
   * the user details. It returns the updated blog post.
   *
   * @param {string} id - The ID of the blog post to update.
   * @param {UpdateBlogDto} updatePostDto - The DTO object containing the updated details of the post.
   * @param {any} req - The Express request object containing the user details.
   * @returns {Promise<void>}
   * @throws {NotFoundException} - If the post with the given ID is not found.
   * @throws {UnauthorizedException} - If the user is not authorized to update the post.
   */
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

  /**

* Endpoint for searching blogs by query.
* @route GET api/blogs/query
* @public
* @param {string} query - The search query string.
* @returns {Promise<Blog[]>} - The search results as an array of blogs.
*/
  @Public()
  @Get('query')
  async search(@Query('q') query: string) {
    const results = await this.blogService.search(query);
    return results;
  }

  /**
   * Delete a blog post with the given ID. The user must have admin or author role to delete the post.
   * The post comments will be deleted as well.
   *
   * @param {string} id - The ID of the blog post to delete.
   * @param {Request} req - The Express request object containing the user details.
   * @returns {Promise<Object>} - An object with a message indicating the success of the delete operation.
   * @throws {NotFoundException} - If the blog post with the given ID is not found.
   * @throws {UnauthorizedException} - If the user is not authorized to delete the post.
   */
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
