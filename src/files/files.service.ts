import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';

import { BaseService } from '@src/shared/libs/tapsa-crud';
import { FileWithRelations } from './files.type';
import { FilesPrismaRepository } from './files.repository';
import { PrismaService } from '@src/shared/modules/prisma-management/prisma-management.service';
import { ConfigType } from '@nestjs/config';
import webAppConfig from '@src/configs/web-app.config';

@Injectable()
export class FilesService extends BaseService<
    FileWithRelations,
    Prisma.FileCreateArgs,
    Prisma.FileUpdateArgs,
    Prisma.FileUpdateManyArgs,
    Prisma.FileFindFirstArgs,
    Prisma.FileFindManyArgs,
    Prisma.FileDeleteArgs,
    Prisma.FileDeleteManyArgs
> {
    constructor(
        public prismaService: PrismaService,
        public fileRepository: FilesPrismaRepository,
        @Inject(webAppConfig.KEY)
        private webAppConfigs: ConfigType<typeof webAppConfig>,
    ) {
        super(fileRepository, {
            NOT_FOUND: 'فایل مورد نظر وجود ندارد',
            DUPLICATE: 'فایل وارد شده تکراری است',
        });
    }
    override add(obj: Prisma.FileCreateArgs): Promise<File> {
        const mimetype = obj.data.mimetype as string;

        if (mimetype === 'image/bmp') {
            obj.data.mimetype = 'imageBmp';
        } else if (mimetype === 'image/gif') {
            obj.data.mimetype = 'imageGif';
        } else if (mimetype === 'image/jpeg') {
            obj.data.mimetype = 'imageJpeg';
        } else if (mimetype === 'image/png') {
            obj.data.mimetype = 'imagePng';
        } else if (mimetype === 'image/png') {
            obj.data.mimetype = 'imageSvgXml';
        }
        obj.data.url = `${this.webAppConfigs.baseUrl}/${obj.data.url}`;

        return super.add(obj);
    }
}
