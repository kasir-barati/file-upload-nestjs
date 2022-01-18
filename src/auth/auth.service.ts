import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@src/user/user.service';
import { CreateUserDto } from './dto';
import { UserSerializer } from '@src/user/user.serializer';
import { AppToken } from './auth.type';
import { UserWithRelations } from '@src/user/user.type';

@Injectable()
export class AuthService {
    constructor(
        public readonly userService: UserService,
        private readonly userSerializer: UserSerializer,
        private readonly jwtService: JwtService,
    ) {}

    async getByEmail(email: string) {
        const user = await this.userService.getOne({
            where: { emailAddress: email },
        });
        if (user) return user;
        throw new HttpException(
            'User with this email does not exist',
            HttpStatus.NOT_FOUND,
        );
    }

    async register(createUser: CreateUserDto) {
        const userExcists = await this.userService.checkExist({
            emailAddress: createUser.email,
        });
        if (userExcists) {
            throw new BadRequestException(
                'There is already an user with the same email address!',
            );
        }

        const newUser = await this.userService.add({
            data: {
                emailAddress: createUser.email,
                firstname: createUser.firstname,
                lastname: createUser.lastname,
                hashedPassword: bcrypt.hashSync(createUser.password, 10),
            },
        });
        return newUser;
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getOne({
            where: { emailAddress: username },
        });
        if (
            user &&
            (await this.verifyPassword(password, user.hashedPassword))
        ) {
            return this.userSerializer.serialize(user, 'UserRoDto');
        }
        return null;
    }

    async login(user: UserWithRelations): Promise<AppToken> {
        const payload = { username: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    private async verifyPassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }
}
