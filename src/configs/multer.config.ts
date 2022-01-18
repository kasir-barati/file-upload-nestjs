import { join } from 'path';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export function multerConfigGenerator(): { multerConfigs: MulterOptions } {
    return {
        multerConfigs: {
            dest: join(process.cwd(), 'static-files'),
            storage: diskStorage({
                destination: join(process.cwd(), 'static-files'),
                filename: function (req, file, callback) {
                    callback(
                        null,
                        `${new Date().getTime()}-${file.originalname}`,
                    );
                },
            }),
            fileFilter: function (req, file, callback) {
                switch (file.mimetype) {
                    case 'image/png':
                    case 'image/jpeg':
                    case 'image/bmp':
                    case 'image/gif':
                    case 'image/svg+xml':
                        callback(null, true);
                        break;
                    default:
                        callback(null, false);
                        break;
                }
            },
        },
    };
}
