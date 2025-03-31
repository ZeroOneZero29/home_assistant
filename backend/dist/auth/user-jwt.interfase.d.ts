import { UserLoginDto } from 'src/user/user.dto';
export interface UserJwtResponse {
    user: UserLoginDto;
    accessToken: string;
}
export interface OauthToken {
    oauthToken: string;
}
