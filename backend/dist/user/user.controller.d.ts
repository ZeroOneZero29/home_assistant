import { UserRegDto, UserLoginDto, UserTokenDto, CreateTokenDto } from './user.dto';
import { UserService } from './user.service';
import { Response, Request } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    regestrationUser(userRegDto: UserRegDto): Promise<import("../entity/user.entity").User>;
    loginUser(userTokenDto: UserTokenDto): Promise<any>;
    userUpade(userUpdateDto: CreateTokenDto, response: Response): Promise<void>;
    readCookie(request: Request): string;
    getUser(): Promise<import("../entity/user.entity").User[]>;
    getOneUser(loginUserDto: UserLoginDto): Promise<any>;
}
