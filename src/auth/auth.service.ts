import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/atu.credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({username});

        if(user && (await bcrypt.compare(password, user.password))) {
            //유저 토큰 생성 (Secret + payload)
            const payload = { username }; //중요한 정보는 넣지말자
            const accessToken = await this.jwtService.sign(payload);
            
            return { accessToken };
        }
        else {
            throw new UnauthorizedException('login Faild');
        }
    }
}
