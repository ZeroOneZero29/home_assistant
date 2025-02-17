export declare class UserRegDto {
    name: string;
    email: string;
    password: string;
}
export declare class UserLoginDto {
    email: string;
    password: string;
}
export declare class CreateTokenDto {
    email: string;
    id: number;
}
export declare class UserTokenDto {
    email: string;
    refreshToken: string;
}
