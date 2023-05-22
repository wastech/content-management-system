"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_blog_dto_1 = require("./create-blog.dto");
class UpdateBlogDto extends (0, mapped_types_1.PartialType)(create_blog_dto_1.CreateBlogDto) {
}
exports.UpdateBlogDto = UpdateBlogDto;
//# sourceMappingURL=update-blog.dto.js.map