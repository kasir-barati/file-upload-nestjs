import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/jwt.guard';
import { UserSerializer } from './user.serializer';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly userSerializer: UserSerializer,
    ) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    async register(@Request() req) {
        console.log(req.user);
        const user = await this.userService.getOneOrFail({
            where: {
                id: req.user.userId,
            },
        });
        return this.userSerializer.serialize(user, 'UserRoDto');
    }
}
