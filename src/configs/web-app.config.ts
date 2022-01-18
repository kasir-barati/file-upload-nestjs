import { registerAs } from '@nestjs/config';
import { NodeEnv, webAppConfigs } from '../shared/types/web-app.type';

export default registerAs(
    'webAppConfigs',
    (): webAppConfigs => ({
        nodeEnv: (process.env?.NODE_ENV as NodeEnv) ?? NodeEnv.development,
        host: process.env?.APP_HOST ?? 'localhost',
        port: Number(process.env?.APP_PORT) ?? 3000,
        baseUrl: process.env.BASE_URL,
    }),
);
