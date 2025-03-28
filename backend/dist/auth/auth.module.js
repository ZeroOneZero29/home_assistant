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
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const user_module_1 = require("../user/user.module");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const access_token_strategy_1 = require("./strategy/access.token.strategy");
const refresh_token_strategy_1 = require("./strategy/refresh.token.strategy");
const configService = new config_1.ConfigService();
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({ global: true }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [access_token_strategy_1.JwtStrategy, refresh_token_strategy_1.RefreshTokenStrategy, auth_service_1.AuthService, passport_1.PassportModule],
        exports: [],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map