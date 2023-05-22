"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_auth_dto_1 = require("./create-auth.dto");
class UpdateAuthDto extends (0, mapped_types_1.PartialType)(create_auth_dto_1.CreateAuthDto) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-auth.dto.js.map