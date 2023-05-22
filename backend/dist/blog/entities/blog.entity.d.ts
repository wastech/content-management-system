import { Category } from './../../category/entities/category.entity';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';
export interface Blog extends Document {
    tags: string[];
    title: string;
    category: Category;
    user: User;
    slug: string;
    description: string;
    timestamp: Date;
    imageUrl: string;
    isFeatured: boolean;
    isPublished: boolean;
}
export declare class Blog {
    tags: string[];
    title: string;
    category: Category;
    author: User;
    slug: string;
    imageUrl: string;
    description: string;
    isPublished: boolean;
    isFeatured: boolean;
    timestamp: Date;
}
declare const BlogSchema: mongoose.Schema<Blog, mongoose.Model<Blog, any, any, any, Document<unknown, any, Blog> & Omit<Blog & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Blog, Document<unknown, {}, mongoose.FlatRecord<Blog>> & Omit<mongoose.FlatRecord<Blog> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export { BlogSchema };
