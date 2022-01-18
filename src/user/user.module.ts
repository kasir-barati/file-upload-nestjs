import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserPrismaRepository } from './user.repository';
import { PrismaModule } from '@src/shared/modules/prisma-management/prisma-management.module';
import { UserSerializer } from './user.serializer';

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [UserService, UserPrismaRepository, UserSerializer],
    exports: [UserService, UserSerializer],
})
export class UserModule {}
