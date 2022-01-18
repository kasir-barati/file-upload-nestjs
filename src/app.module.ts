import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import configuration from '@src/configs/config';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { FilesModule } from './files/files.module';
import { validate } from './shared/validators/env.validator';
import webAppConfigsGenerator from './configs/web-app.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            envFilePath: ['.env'],
            load: [configuration, webAppConfigsGenerator],
            validate,
        }),
        AuthModule,
        UserModule,
        TasksModule,
        FilesModule,
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'static-files'),
            exclude: ['/api*'],
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
