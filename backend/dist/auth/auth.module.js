"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const mongoose_1 = require("@nestjs/mongoose");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth.guard");
const roles_guard_1 = require("./roles.guard");
const auth_entity_1 = require("./entities/auth.entity");
const dotenv = require("dotenv");
dotenv.config();
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: auth_entity_1.Auth.name, schema: auth_entity_1.AuthSchema }]),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRING_DATE },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map