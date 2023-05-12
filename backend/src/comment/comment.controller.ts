import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/entities/auth.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Guest)
  async createComment(
    @Param('postId') postId: string,
    @Request() req,
    @Body('content') content: string,
  ): Promise<Comment> {
    const author = req.user._id;
    return this.commentService.createComment(postId, author, content);
  }

  @Public()
  @Get(':postId')
  async getPostComments(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentService.getPostComments(postId);
  }

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
