"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConfig = void 0;
const mongoose_1 = require("@nestjs/mongoose");
function mongooseConfig() {
    const mongodbUri = process.env.MONGODB_URI;
    return mongoose_1.MongooseModule.forRoot(mongodbUri);
}
exports.mongooseConfig = mongooseConfig;
//# sourceMappingURL=mongoose.config.js.map