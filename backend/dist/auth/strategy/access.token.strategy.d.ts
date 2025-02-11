import { Strategy } from 'passport-jwt';
import { UserLoginDto } from 'src/user/user.dto';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithoutRequest] | [opt: import("passport-jwt").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserLoginDto): Promise<UserLoginDto>;
}
export {};
