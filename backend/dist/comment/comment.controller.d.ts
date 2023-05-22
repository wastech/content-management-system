import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { BlogService } from '../blog/blog.service';
export declare class CommentController {
    private readonly commentService;
    private blogService;
    constructor(commentService: CommentService, blogService: BlogService);
    createComment(postId: string, req: any, content: string): Promise<Comment>;
    getPostComments(postId: string): Promise<Comment[]>;
    deleteComment(id: string, req: any): Promise<{
        message: string;
    }>;
}
