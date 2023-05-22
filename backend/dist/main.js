"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const helmet_1 = require("helmet");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config({ path: '.env' });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use((0, helmet_1.default)());
    app.enableCors();
    await app.listen(process.env.PORT || 5000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map