"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const blog_controller_1 = require("./blog.controller");
const blog_entity_1 = require("./entities/blog.entity");
const platform_express_1 = require("@nestjs/platform-express");
const mongoose_1 = require("@nestjs/mongoose");
const multer_1 = require("multer");
const path_1 = require("path");
const comment_module_1 = require("../comment/comment.module");
const category_entity_1 = require("../category/entities/category.entity");
let BlogModule = class BlogModule {
};
BlogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Blog', schema: blog_entity_1.BlogSchema },
                { name: category_entity_1.Category.name, schema: category_entity_1.CategorySchema },
            ]),
            (0, common_1.forwardRef)(() => comment_module_1.CommentModule),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/blog',
                    filename: (req, file, callback) => {
                        const name = file.originalname.split('.')[0];
                        const fileExtName = (0, path_1.extname)(file.originalname);
                        const randomName = Array(4)
                            .fill(null)
                            .map(() => Math.round(Math.random() * 16).toString(16))
                            .join('');
                        callback(null, `${name}-${randomName}${fileExtName}`);
                    },
                }),
            }),
        ],
        controllers: [blog_controller_1.BlogController],
        providers: [blog_service_1.BlogService],
        exports: [blog_service_1.BlogService],
    })
], BlogModule);
exports.BlogModule = BlogModule;
//# sourceMappingURL=blog.module.js.map