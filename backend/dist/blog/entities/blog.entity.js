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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogSchema = exports.Blog = void 0;
const category_entity_1 = require("./../../category/entities/category.entity");
const mongoose_1 = require("@nestjs/mongoose");
const slugify_1 = require("slugify");
const mongoose = require("mongoose");
const user_entity_1 = require("../../user/entities/user.entity");
let Blog = class Blog {
};
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Blog.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] }),
    __metadata("design:type", category_entity_1.Category)
], Blog.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }),
    __metadata("design:type", user_entity_1.User)
], Blog.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Blog.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Blog.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Blog.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Blog.prototype, "isPublished", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Blog.prototype, "isFeatured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Blog.prototype, "timestamp", void 0);
Blog = __decorate([
    (0, mongoose_1.Schema)()
], Blog);
exports.Blog = Blog;
const BlogSchema = mongoose_1.SchemaFactory.createForClass(Blog);
exports.BlogSchema = BlogSchema;
BlogSchema.pre('save', function (next) {
    if (!this.isModified('title')) {
        return next();
    }
    this.slug = (0, slugify_1.default)(this.title, { lower: true });
    next();
});
//# sourceMappingURL=blog.entity.js.map