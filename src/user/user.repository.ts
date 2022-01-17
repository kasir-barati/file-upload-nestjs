import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@src/shared/libs/tapsa-repository';
import { PrismaService } from '@src/shared/modules/prisma-management/prisma-management.service';
import { UserWithRelations } from './user.type';

@Injectable()
export class UserPrismaRepository extends BasePrismaRepository<
    UserWithRelations,
    Prisma.UserCreateArgs,
    Prisma.UserUpdateArgs,
    Prisma.UserUpdateManyArgs,
    Prisma.UserFindFirstArgs,
    Prisma.UserFindManyArgs,
    Prisma.UserDeleteArgs,
    Prisma.UserDeleteManyArgs
> {
    constructor(public readonly prismaService: PrismaService) {
        super(prismaService.user);
    }
}
