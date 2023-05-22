"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let AnyExceptionFilter = class AnyExceptionFilter {
    catch(error, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = error instanceof common_1.HttpException
            ? error.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: error.message || 'Internal server error',
        });
    }
};
AnyExceptionFilter = __decorate([
    (0, common_1.Catch)()
], AnyExceptionFilter);
exports.AnyExceptionFilter = AnyExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map