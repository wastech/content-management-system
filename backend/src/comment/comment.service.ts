import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './entities/comment.entity';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
  ) {}

  async createComment(
    postId: string,
    author: string,
    content: string,
  ): Promise<Comment> {
    const newComment = new this.commentModel({
      author,
      content,
      post: postId,
    });
    return newComment.save();
  }

  async getCommentById(id: string): Promise<Comment> {
    return this.commentModel.findById(id);
  }

  async getPostComments(postId: string): Promise<Comment[]> {
    const comments = await this.commentModel.find({ post: postId });
    console.log('object', postId);
    if (!comments || comments.length === 0) {
      throw new NotFoundException('Comments not found');
    }
    return comments;
  }

  async deleteComment(commentId: string): Promise<void> {
    const comment = await this.commentModel.findByIdAndDelete(commentId);
  }

  async deleteManyByPostId(postId: string) {
    return this.commentModel.deleteMany({ post: postId });
  }
}
