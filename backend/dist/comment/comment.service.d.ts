import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';
export declare class CommentService {
    private readonly commentModel;
    constructor(commentModel: Model<Comment>);
    createComment(postId: string, author: string, content: string): Promise<Comment>;
    getCommentById(id: string): Promise<Comment>;
    getPostComments(postId: string): Promise<Comment[]>;
    deleteComment(commentId: string): Promise<void>;
    deleteManyByPostId(postId: string): Promise<import("mongodb").DeleteResult>;
}
