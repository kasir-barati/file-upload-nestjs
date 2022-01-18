import { createReadStream } from 'fs';
import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    UseGuards,
    Get,
    Param,
    StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '@src/auth/jwt.guard';
import { multerConfigGenerator } from '@src/configs/multer.config';
import { CurrentUser } from '@src/shared/decorators/current-user.decorator';
import { JwtPayload } from '@src/shared/types/jwt-payload.type';
import { FilesSerializer } from './files.serializer';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService,
        private readonly fileSerializer: FilesSerializer,
    ) {}

    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UseInterceptors(
        FileInterceptor('file', multerConfigGenerator().multerConfigs),
    )
    async create(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: JwtPayload,
    ) {
        try {
            const uploadedFile = await this.filesService.add({
                data: {
                    userId: user.userId,
                    url: file.filename,
                    mimetype: file.mimetype as any,
                    size: file.size,
                },
            });

            return this.fileSerializer.serialize(uploadedFile, 'FileRoDto');
        } catch (error) {
            throw error;
        }
    }

    @Get('get/:fileId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async findAll(@Param('fileId') fileId: string) {
        const file = await this.filesService.getOne({
            where: {
                id: Number(fileId),
            },
        });
        const stream = createReadStream(file.url);

        return new StreamableFile(stream);
    }

    @Get(':fileId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getOneFile(@Param('fileId') fileId: string) {
        const file = await this.filesService.getOne({
            where: {
                id: Number(fileId),
            },
        });

        return this.fileSerializer.serialize(file, 'GetFileByFileId');
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    //     return this.filesService.update(+id, updateFileDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.filesService.remove(+id);
    // }
}
