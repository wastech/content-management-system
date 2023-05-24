/// <reference types="multer" />
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { CommentService } from '../comment/comment.service';
export declare class BlogController {
    private readonly blogService;
    private readonly commentService;
    constructor(blogService: BlogService, commentService: CommentService);
    create(file: Express.Multer.File, createBlogDto: CreateBlogDto, req: any): Promise<Blog>;
    getAll(page: number, limit: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, Blog> & Omit<Blog & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        currentPage: number;
        totalPages: number;
        totalPosts: number;
    }>;
    getPublishedPosts(page: number, limit: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, Blog> & Omit<Blog & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        currentPage: number;
        totalPages: number;
        totalPosts: number;
    }>;
    getFeaturedPosts(): Promise<Blog[]>;
    getPostByIdCategoryAndSlug(id: string, category: string, slug: string): Promise<Blog>;
    findSimilarBlogs(id: string): Promise<Blog[]>;
    getBlogsByAuthor(authorId: string): Promise<Blog[]>;
    getBlogsByCategory(categoryName: string): Promise<Blog[]>;
    getAllTags(): Promise<{
        tags: {
            name: string;
            count: number;
        }[];
    }>;
    getPostsByTag(tag: string): Promise<{
        posts: Blog[];
    }>;
    updatePost(id: string, updatePostDto: UpdateBlogDto, req: any): Promise<{
        message: string;
        post: Blog;
    }>;
    search(query: string): Promise<Blog[]>;
    deletePost(id: string, req: any): Promise<{
        message: string;
    }>;
}
