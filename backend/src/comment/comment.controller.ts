import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/entities/auth.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { BlogService } from '../blog/blog.service';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private blogService: BlogService,
  ) {}

  /**
   * Creates a new comment on a blog post.
   * @param {string} postId - The ID of the blog post.
   * @param {Express.Request} req - The request object.
   * @param {string} content - The content of the comment.
   * @returns {Promise<Comment>} The newly created comment.
   * @throws {NotFoundException} If the blog post is not found.
   */
  @Post(':postId')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Guest)
  async createComment(
    @Param('postId') postId: string,
    @Request() req,
    @Body('content') content: string,
  ): Promise<Comment> {
    const author = req.user._id;
    // Check if the post exists
    const post = await this.blogService.getPostById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.commentService.createComment(postId, author, content);
  }

  /**
   * Retrieves all comments for a specific blog post.
   * @param {string} postId - The ID of the blog post.
   * @returns {Promise<Comment[]>} The list of comments for the post.
   */
  @Public()
  @Get(':postId')
  async getPostComments(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentService.getPostComments(postId);
  }

  /**
   * Deletes a comment by ID
   * @param {string} id - The ID of the comment
   * @param {Request} req - The request object
   * @returns {Promise<Object>} An object with a success message
   * @throws {NotFoundException} If the comment is not found
   * @throws {UnauthorizedException} If the user is not authorized to delete the comment
   */

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Guest)
  async deleteComment(@Param('id') id: string, @Request() req) {
    const comment = await this.commentService.getCommentById(id);
    if (!comment) {
      throw new NotFoundException(`Comment post with ID ${id} not found`);
    }
    const user = req.user;

    // Check if user is admin or author of the comment
    if (
      comment.author.toString() !== user._id.toString() &&
      user.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        `You are not authorized to delete this post`,
      );
    }

    await this.commentService.deleteComment(id);
    return { message: `Blog post with ID ${id} deleted successfully` };
  }
}
