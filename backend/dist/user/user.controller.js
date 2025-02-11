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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./user.dto");
const user_service_1 = require("./user.service");
const accessToken_guard_1 = require("../guards/accessToken.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async regestrationUser(userRegDto) {
        console.log(userRegDto);
        return this.userService.createUser(userRegDto);
    }
    async loginUser(userLoginDto) {
        console.log(userLoginDto);
        return this.userService.loginUser(userLoginDto);
    }
    async userUpade(userUpdateDto, response) {
        const token = await this.userService.updateUser(userUpdateDto);
        const acessToken = token.accessToken;
        const refreshToken = token.refreshToken;
        response.cookie('access', acessToken, {
            httpOnly: true,
        });
        response.cookie('refresh', refreshToken);
        response.header('Set-Cookie', `access=${acessToken}; HttpOnly; Secure; SameSite=None; Max-Age=60000; Path=/;`);
    }
    readCookie(request) {
        const cookie = request.cookies['access'];
        return `Read cookie: ${cookie}`;
    }
    async getUser() {
        return this.userService.getUser();
    }
    async getOneUser(loginUserDto) {
        return this.userService.getOneUser(loginUserDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/reg'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserRegDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "regestrationUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userUpade", null);
__decorate([
    (0, common_1.Get)('/read-cookie'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "readCookie", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('/one'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOneUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map