import { UserLoginDto } from 'src/user/user.dto';
export interface UserJwtResponse {
    user: UserLoginDto;
    accessToken: string;
}
