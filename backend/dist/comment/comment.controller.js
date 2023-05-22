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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const roles_guard_1 = require("../auth/roles.guard");
const auth_entity_1 = require("../auth/entities/auth.entity");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const blog_service_1 = require("../blog/blog.service");
let CommentController = class CommentController {
    constructor(commentService, blogService) {
        this.commentService = commentService;
        this.blogService = blogService;
    }
    async createComment(postId, req, content) {
        const author = req.user._id;
        const post = await this.blogService.getPostById(postId);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return this.commentService.createComment(postId, author, content);
    }
    async getPostComments(postId) {
        return this.commentService.getPostComments(postId);
    }
    async deleteComment(id, req) {
        const comment = await this.commentService.getCommentById(id);
        if (!comment) {
            throw new common_1.NotFoundException(`Comment post with ID ${id} not found`);
        }
        const user = req.user;
        if (comment.author.toString() !== user._id.toString() &&
            user.role !== 'admin') {
            throw new common_1.UnauthorizedException(`You are not authorized to delete this post`);
        }
        await this.commentService.deleteComment(id);
        return { message: `Blog post with ID ${id} deleted successfully` };
    }
};
__decorate([
    (0, common_1.Post)(':postId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.Admin, auth_entity_1.Role.Guest),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':postId'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getPostComments", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.Admin, auth_entity_1.Role.Guest),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
CommentController = __decorate([
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService,
        blog_service_1.BlogService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map