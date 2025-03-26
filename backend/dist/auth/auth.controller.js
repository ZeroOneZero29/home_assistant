"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_dto_1 = require("../user/user.dto");
const accessToken_guard_1 = require("../guards/accessToken.guard");
const refreshToken_guard_1 = require("../guards/refreshToken.guard");
const refresh_token_strategy_1 = require("./strategy/refresh.token.strategy");
let AuthController = class AuthController {
    constructor(authService, refreshTokenStrategy) {
        this.authService = authService;
        this.refreshTokenStrategy = refreshTokenStrategy;
    }
    async test(userLoginDto) {
        console.log(userLoginDto);
    }
    async singUp(userRegDto) {
        console.log(userRegDto);
        console.log('dada');
        return this.authService.logUp(userRegDto);
    }
    async singIn(userLoginDto) {
        return this.authService.logIn(userLoginDto);
    }
    async getYandexToken(oauth) { }
    async refreshTokensAccess(request) {
        const [type, token] = request.headers.authorization?.split(' ');
        const refreshTokens = type === 'Bearer' ? token : undefined;
        return await this.authService.updateAccessTokens(refreshTokens);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "test", null);
__decorate([
    (0, common_1.Post)('reg'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserRegDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "singUp", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "singIn", null);
__decorate([
    (0, common_1.Get)('oauth'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getYandexToken", null);
__decorate([
    (0, common_1.UseGuards)(refreshToken_guard_1.RefreshTokenGuard),
    (0, common_1.Get)('/refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokensAccess", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        refresh_token_strategy_1.RefreshTokenStrategy])
], AuthController);
//# sourceMappingURL=auth.controller.js.map