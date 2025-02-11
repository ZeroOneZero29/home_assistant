import { Strategy } from 'passport-jwt';
import { Request } from 'express';
declare const RefreshTokenStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithoutRequest] | [opt: import("passport-jwt").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    validate(req: Request, payload: any): Promise<any>;
}
export {};
