import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  async create(createBlogDto: CreateBlogDto, user: JwtPayload): Promise<Blog> {
    const createdBlog = new this.blogModel({
      ...createBlogDto,
      author: user._id,
    });
    return createdBlog.save();
  }

  async findAll(page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit; // calculate how many posts to skip based on page and limit
    const total = await this.blogModel.countDocuments(); // get the total number of posts
    const blogs = await this.blogModel.find().skip(skip).limit(limit).exec(); // get the posts for the current page

    return {
      data: blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    };
  }

  async findByIdCategoryAndSlug(
    id: string,
    category: string,
    slug: string,
  ): Promise<Blog> {
    return await this.blogModel
      .findOne({
        _id: id,
        category: category,
        slug: slug,
      })
      .exec();
  }

  async getPostById(postId: string): Promise<Blog> {
    const post = await this.blogModel.findById(postId).exec();
    return post;
  }

  async findSimilarBlogs(blog: Blog): Promise<Blog[]> {
    const similarBlogs = await this.blogModel
      .find({
        category: blog.category,
        _id: { $ne: blog._id }, // exclude the current blog post from the results
      })
      .sort({ createdAt: -1 }) // sort by creation date in descending order
      .limit(3) // limit to a maximum of 3 similar posts
      .exec();

    return similarBlogs;
  }

  async getBlogsByAuthor(authorId: string): Promise<Blog[]> {
    const blogs = await this.blogModel.find({ author: authorId }).exec();
    return blogs;
  }

  async findByCategory(categoryName: string): Promise<Blog[]> {
    return this.blogModel.find({ category: categoryName }).exec();
  }

  async getAllTags(): Promise<{ name: string; count: number }[]> {
    const tags = await this.blogModel.aggregate([
      { $unwind: '$tag' },
      { $group: { _id: '$tag', count: { $sum: 1 } } },
      { $project: { _id: 0, name: '$_id', count: 1 } },
      { $sort: { count: -1 } },
    ]);
    return tags;
  }

  async getPostsByTag(tag: string): Promise<Blog[]> {
    const posts = await this.blogModel.find({ tag: tag }).exec();
    return posts;
  }

  async deletePost(id: string): Promise<void> {
    await this.blogModel.findByIdAndDelete(id).exec();
  }
}
