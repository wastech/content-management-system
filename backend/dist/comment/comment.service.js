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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const comment_entity_1 = require("./entities/comment.entity");
let CommentService = class CommentService {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }
    async createComment(postId, author, content) {
        const newComment = new this.commentModel({
            author,
            content,
            post: postId,
        });
        return newComment.save();
    }
    async getCommentById(id) {
        return this.commentModel.findById(id);
    }
    async getPostComments(postId) {
        const comments = await this.commentModel.find({ post: postId });
        console.log('object', postId);
        if (!comments || comments.length === 0) {
            throw new common_1.NotFoundException('Comments not found');
        }
        return comments;
    }
    async deleteComment(commentId) {
        const comment = await this.commentModel.findByIdAndDelete(commentId);
    }
    async deleteManyByPostId(postId) {
        return this.commentModel.deleteMany({ post: postId });
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(comment_entity_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map