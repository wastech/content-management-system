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
import { CreateBlogDto } from './dto/create-blog.dto';
import { Model } from 'mongoose';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CategoryDocument } from '../category/entities/category.entity';
export declare class BlogService {
    private readonly blogModel;
    private readonly categoryModel;
    constructor(blogModel: Model<Blog>, categoryModel: Model<CategoryDocument>);
    create(createBlogDto: CreateBlogDto, user: JwtPayload): Promise<Blog>;
    findAll(page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, Blog> & Omit<Blog & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        currentPage: number;
        totalPages: number;
        totalPosts: number;
    }>;
    getPublishedPosts(page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, Blog> & Omit<Blog & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        currentPage: number;
        totalPages: number;
        totalPosts: number;
    }>;
    findFeaturedPosts(): Promise<Blog[]>;
    findByIdCategoryAndSlug(id: string, category: string, slug: string): Promise<Blog>;
    getPostById(postId: string): Promise<Blog>;
    findSimilarBlogs(blog: Blog): Promise<Blog[]>;
    getBlogsByAuthor(authorId: string): Promise<Blog[]>;
    findByCategory(categoryName: string): Promise<Blog[]>;
    getAllTags(): Promise<{
        name: string;
        count: number;
    }[]>;
    getPostsByTag(tag: string): Promise<Blog[]>;
    updatePost(id: string, updatePostDto: Partial<UpdateBlogDto>): Promise<Blog>;
    search(query: string): Promise<Blog[]>;
    deletePost(id: string): Promise<void>;
}
