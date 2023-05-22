"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const mongoose_config_1 = require("./database/mongoose.config");
const http_exception_filter_1 = require("./http-exception.filter");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const dotenv_1 = require("dotenv");
const user_module_1 = require("./user/user.module");
const blog_module_1 = require("./blog/blog.module");
const category_module_1 = require("./category/category.module");
const comment_module_1 = require("./comment/comment.module");
(0, dotenv_1.config)();
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, mongoose_config_1.mongooseConfig)(),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            blog_module_1.BlogModule,
            category_module_1.CategoryModule,
            comment_module_1.CommentModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.AnyExceptionFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map