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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entity/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(userRegDto) {
        const { email } = userRegDto;
        const emailInDb = await this.userRepository.findOneBy({ email });
        if (emailInDb) {
            throw new common_1.NotFoundException(`Пользователь ${email} уже существует `);
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(userRegDto.password, salt);
        const userToDB = {
            name: userRegDto.name,
            email: userRegDto.email,
            password: hashPassword,
        };
        console.log(userRegDto);
        const user = this.userRepository.create(userToDB);
        return this.userRepository.save(user);
    }
    async findUserById(id) {
        return this.userRepository.findBy({ id });
    }
    async loginUser(userLoginDto) {
        const { email, password } = userLoginDto;
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new common_1.NotFoundException(`Пользователь с данным ${email} не найден!`);
        }
        const passwordVerified = await bcrypt.compare(password, user.password);
        if (!passwordVerified) {
            throw new common_1.NotFoundException(`Пароль для пользователя ${email} не верный!`);
        }
        const requreData = { name: user.name, refreshToken: user.refreshToken };
        return requreData;
    }
    async updateUser(userLoginDto) {
        const { email } = userLoginDto;
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new common_1.NotFoundException(`Пользователь с данным ${email} не найден`);
        }
        user.oauthToken = 'dada';
        await this.userRepository.save(user);
        return user;
    }
    async getUser() {
        return this.userRepository.find();
    }
    async getOneUser(loginUser) {
        const { email, password } = loginUser;
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new common_1.NotFoundException(`Пользователь с данным ${email} не найден`);
        }
        const passwordVerify = await bcrypt.compare(password, user.password);
        if (!passwordVerify) {
            throw new common_1.NotFoundException(`Неверно введен пароль`);
        }
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map