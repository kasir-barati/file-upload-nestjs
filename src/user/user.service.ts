import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { BaseService } from '@src/shared/libs/tapsa-crud';
import { PrismaService } from '@src/shared/modules/prisma-management/prisma-management.service';
import { UserPrismaRepository } from './user.repository';
import { UserWithRelations } from './user.type';

@Injectable()
export class UserService extends BaseService<
    UserWithRelations,
    Prisma.UserCreateArgs,
    Prisma.UserUpdateArgs,
    Prisma.UserUpdateManyArgs,
    Prisma.UserFindFirstArgs,
    Prisma.UserFindManyArgs,
    Prisma.UserDeleteArgs,
    Prisma.UserDeleteManyArgs
> {
    constructor(
        public prismaService: PrismaService,
        public userRepository: UserPrismaRepository,
    ) {
        super(userRepository, {
            NOT_FOUND: 'کاربر وجود ندارد',
            DUPLICATE: 'کاربر تکراری است',
        });
    }
}
