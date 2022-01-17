import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from '@src/config';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        AuthModule,
        UserModule,
        TasksModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
