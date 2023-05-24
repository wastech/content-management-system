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
