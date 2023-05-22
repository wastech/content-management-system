/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/aggregate" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/callback" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/collection" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/connection" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/cursor" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/document" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/error" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/expressions" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/helpers" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/middlewares" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/indexes" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/models" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/mongooseoptions" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/pipelinestage" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/populate" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/query" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/schemaoptions" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/schematypes" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/session" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/types" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/utility" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/validation" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/virtuals" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/inferschematype" />
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
