"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cookieParser = require("cookie-parser");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('port');
    app.setGlobalPrefix('api');
    await app.listen(port ?? 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map