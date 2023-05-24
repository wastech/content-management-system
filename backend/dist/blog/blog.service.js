"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const slugify_1 = require("slugify");
const category_entity_1 = require("../category/entities/category.entity");
let BlogService = class BlogService {
    constructor(blogModel, categoryModel) {
        this.blogModel = blogModel;
        this.categoryModel = categoryModel;
    }
    async create(createBlogDto, user) {
        const createdBlog = new this.blogModel(Object.assign(Object.assign({}, createBlogDto), { author: user._id }));
        return createdBlog.save();
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const total = await this.blogModel.countDocuments();
        const blogs = await this.blogModel.find().skip(skip).limit(limit).exec();
        return {
            data: blogs,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
        };
    }
    async getPublishedPosts(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const total = await this.blogModel.countDocuments();
        const blogs = await this.blogModel
            .find({ isPublished: true })
            .skip(skip)
            .limit(limit)
            .exec();
        return {
            data: blogs,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
        };
    }
    async findFeaturedPosts() {
        return this.blogModel
            .find({ isFeatured: true })
            .sort({ createdAt: -1 })
            .limit(4)
            .exec();
    }
    async findByIdCategoryAndSlug(id, category, slug) {
        return await this.blogModel
            .findOne({
            _id: id,
            category: category,
            slug: slug,
        })
            .populate('category', 'name')
            .exec();
    }
    async getPostById(postId) {
        const post = await this.blogModel.findById(postId).exec();
        return post;
    }
    async findSimilarBlogs(blog) {
        const similarBlogs = await this.blogModel
            .find({
            category: blog.category,
            _id: { $ne: blog._id },
        })
            .sort({ createdAt: -1 })
            .limit(3)
            .exec();
        return similarBlogs;
    }
    async getBlogsByAuthor(authorId) {
        const blogs = await this.blogModel.find({ author: authorId }).exec();
        return blogs;
    }
    async findByCategory(categoryName) {
        return this.blogModel.find({ category: categoryName }).exec();
    }
    async getAllTags() {
        const tags = await this.blogModel.aggregate([
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $project: { _id: 0, name: '$_id', count: 1 } },
            { $sort: { count: -1 } },
        ]);
        return tags;
    }
    async getPostsByTag(tag) {
        const posts = await this.blogModel.find({ tags: tag }).exec();
        return posts;
    }
    async updatePost(id, updatePostDto) {
        const options = { new: true };
        if (updatePostDto.title) {
            updatePostDto.slug = (0, slugify_1.default)(updatePostDto.title, { lower: true });
        }
        return this.blogModel.findByIdAndUpdate(id, updatePostDto, options).exec();
    }
    async search(query) {
        const results = await this.blogModel
            .find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { tag: { $regex: query, $options: 'i' } },
            ],
        })
            .exec();
        return results;
    }
    async deletePost(id) {
        await this.blogModel.findByIdAndDelete(id).exec();
    }
};
BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Blog')),
    __param(1, (0, mongoose_2.InjectModel)(category_entity_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map