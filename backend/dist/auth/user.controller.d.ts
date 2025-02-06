import { UserRegDto, UserLoginDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    regestrationUser(userRegDto: UserRegDto): Promise<import("../entity/user.entity").User>;
    loginUser(userLoginDto: UserLoginDto): Promise<object>;
    getUser(): Promise<import("../entity/user.entity").User[]>;
    getOneUser(loginUserDto: UserRegDto): Promise<any>;
}
