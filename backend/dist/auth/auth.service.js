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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async logUp(userRegDto) {
        const { email } = userRegDto;
        const checkedUser = await this.userService.findByEmail(email);
        if (checkedUser) {
            throw new common_1.NotFoundException(`Пользователь ${email} уже существует `);
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(userRegDto.password, salt);
        const userToDB = { ...userRegDto, password: hashPassword };
        return await this.userService.createUser(userToDB);
    }
    async logIn(userLoginDto) {
        const { password, email } = userLoginDto;
        const checkedUser = await this.userService.findByEmail(email);
        if (!checkedUser) {
            throw new common_1.NotFoundException(`Пользователь с данным ${email} не найден!`);
        }
        const passwordVerified = await bcrypt.compare(password, checkedUser.password);
        if (!passwordVerified) {
            throw new common_1.NotFoundException(`Пароль для пользователя ${email} не верный!`);
        }
        const payloadTokens = {
            email: checkedUser.email,
            id: checkedUser.id,
        };
        const tokens = await this.genTokens(payloadTokens);
        const tokenSalt = await bcrypt.genSalt();
        const refreshTokenEncrypt = await bcrypt.hash(tokens.refreshToken, tokenSalt);
        const user = await this.userService.loginUser({
            email,
            refreshToken: refreshTokenEncrypt,
        });
        console.log(tokens);
        return tokens;
    }
    async updateRefreshTokens(userToken) {
        const user = await this.userService.findByEmail(userToken.email);
        if (!user) {
            throw new common_1.ForbiddenException('Доступ запрещен');
        }
        const refreshTokenVerify = await bcrypt.compare(userToken.refreshToken, user.refreshToken);
        if (!refreshTokenVerify) {
            throw new common_1.ForbiddenException('Доступ запрещен');
        }
        const payloadTokens = {
            email: user.email,
            id: user.id,
        };
        const tokens = await this.genTokens(payloadTokens);
        const salt = await bcrypt.genSalt();
        const tokenEncrypt = await bcrypt.hash(tokens.refreshToken, salt);
        const updateTokens = {
            email: user.email,
            refreshToken: tokenEncrypt,
        };
        await this.userService.updateTokens(updateTokens);
        return tokens;
    }
    async genTokens(user) {
        console.log();
        const payload = { sub: user.email, id: user.id };
        console.log(payload);
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('secret_jwt'),
            expiresIn: '3d',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('secret_jwt_refresh'),
            expiresIn: '30d',
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map