import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';
export declare class Comment extends Document {
    author: User;
    content: string;
    post: string;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, Document<unknown, any, Comment> & Omit<Comment & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment, Document<unknown, {}, mongoose.FlatRecord<Comment>> & Omit<mongoose.FlatRecord<Comment> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
