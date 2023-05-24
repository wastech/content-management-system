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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const update_blog_dto_1 = require("./dto/update-blog.dto");
const roles_guard_1 = require("../auth/roles.guard");
const auth_entity_1 = require("../auth/entities/auth.entity");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const comment_service_1 = require("../comment/comment.service");
const mongodb_1 = require("mongodb");
const platform_express_1 = require("@nestjs/platform-express");
let BlogController = class BlogController {
    constructor(blogService, commentService) {
        this.blogService = blogService;
        this.commentService = commentService;
    }
    async create(file, createBlogDto, req) {
        try {
            createBlogDto.imageUrl = file.path;
            const savedBlogPost = await this.blogService.create(createBlogDto, req.user);
            savedBlogPost.imageUrl = `${req.protocol}://${req.get('host')}/${savedBlogPost.imageUrl}`;
            return savedBlogPost;
        }
        catch (error) {
            if (error instanceof mongodb_1.MongoError && error.code === 11000) {
                throw new Error('Slug already exists');
            }
            else {
                throw error;
            }
        }
    }
    async getAll(page, limit) {
        return this.blogService.findAll(page, limit);
    }
    async getPublishedPosts(page, limit) {
        return this.blogService.getPublishedPosts(page, limit);
    }
    async getFeaturedPosts() {
        return this.blogService.findFeaturedPosts();
    }
    async getPostByIdCategoryAndSlug(id, category, slug) {
        const post = await this.blogService.findByIdCategoryAndSlug(id, category, slug);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async findSimilarBlogs(id) {
        const blog = await this.blogService.getPostById(id);
        if (!blog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        const similarBlogs = await this.blogService.findSimilarBlogs(blog);
        return similarBlogs;
    }
    async getBlogsByAuthor(authorId) {
        const blogs = await this.blogService.getBlogsByAuthor(authorId);
        return blogs;
    }
    async getBlogsByCategory(categoryName) {
        return this.blogService.findByCategory(categoryName);
    }
    async getAllTags() {
        const tags = await this.blogService.getAllTags();
        const formattedTags = tags.map((tag) => ({
            name: tag.name,
            count: tag.count,
        }));
        return { tags: formattedTags };
    }
    async getPostsByTag(tag) {
        const posts = await this.blogService.getPostsByTag(tag);
        return { posts };
    }
    async updatePost(id, updatePostDto, req) {
        const post = await this.blogService.getPostById(id);
        if (!post) {
            throw new common_1.NotFoundException(`Blog post with ID ${id} not found`);
        }
        const user = req.user;
        if (post.author.toString() !== user._id.toString() &&
            user.role !== 'admin') {
            throw new common_1.UnauthorizedException(`You are not authorized to update this post`);
        }
        const updatedPost = await this.blogService.updatePost(id, updatePostDto);
        return {
            message: `Blog post with ID ${id} updated successfully`,
            post: updatedPost,
        };
    }
    async search(query) {
        const results = await this.blogService.search(query);
        return results;
    }
    async deletePost(id, req) {
        const post = await this.blogService.getPostById(id);
        if (!post) {
            throw new common_1.NotFoundException(`Blog post with ID ${id} not found`);
        }
        const user = req.user;
        if (post.author.toString() !== user._id.toString() &&
            user.role !== 'admin') {
            throw new common_1.UnauthorizedException(`You are not authorized to delete this post`);
        }
        await this.commentService.deleteManyByPostId(id);
        await this.blogService.deletePost(id);
        return { message: `Blog post with ID ${id} deleted successfully` };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.Admin, auth_entity_1.Role.Guest),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imageUrl')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_blog_dto_1.CreateBlogDto, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('published'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPublishedPosts", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('featured'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getFeaturedPosts", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id/:category/:slug'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('category')),
    __param(2, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPostByIdCategoryAndSlug", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id/similar'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findSimilarBlogs", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/author/:authorId'),
    __param(0, (0, common_1.Param)('authorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBlogsByAuthor", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('category/:categoryName'),
    __param(0, (0, common_1.Param)('categoryName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBlogsByCategory", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAllTags", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('tag/:tag'),
    __param(0, (0, common_1.Param)('tag')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPostsByTag", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_blog_dto_1.UpdateBlogDto, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updatePost", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('query'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "search", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deletePost", null);
BlogController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blog_service_1.BlogService,
        comment_service_1.CommentService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map