import { UserRegDto, UserLoginDto, UserUpdateDto } from './user.dto';
import { UserService } from './user.service';
import { Response, Request } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    regestrationUser(userRegDto: UserRegDto): Promise<import("../entity/user.entity").User>;
    loginUser(userLoginDto: UserLoginDto): Promise<object | undefined>;
    userUpade(userUpdateDto: UserUpdateDto, response: Response): Promise<void>;
    readCookie(request: Request): string;
    getUser(): Promise<import("../entity/user.entity").User[]>;
    getOneUser(loginUserDto: UserLoginDto): Promise<any>;
}
