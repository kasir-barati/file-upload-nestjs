import { plainToClass } from 'class-transformer';
import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    validateSync,
} from 'class-validator';

import { NodeEnv } from '@src/shared/types/web-app.type';

class EnvironmentVariables {
    @IsEnum(NodeEnv, { message: 'node_env_is_invalid' })
    NODE_ENV!: NodeEnv;

    @IsString({ message: 'app_host_should_be_string' })
    APP_HOST!: string;

    @IsInt({ message: 'app_port_should_be_integer' })
    APP_PORT!: number;

    @IsString({ message: 'base_url_should_be_string' })
    BASE_URL!: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfigs = plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const validatedConfigsErrors = validateSync(validatedConfigs, {
        skipMissingProperties: false,
    });

    if (validatedConfigsErrors.length > 0) {
        console.dir({
            errors: validatedConfigsErrors.map((error) => ({
                value: error.value,
                property: error.property,
                message: Object.values(error.constraints!)[0],
            })),
            errorCode: 'required_environment_variables_loading_failed',
            message:
                'Application could not load required environment variables',
        });
        throw new Error(validatedConfigsErrors.toString());
    }

    return validatedConfigs;
}
