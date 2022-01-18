export enum NodeEnv {
    development = 'development',
    production = 'production',
    test = 'test',
    provision = 'provision',
}

export interface webAppConfigs {
    nodeEnv: NodeEnv;
    host: string;
    port: number;
    baseUrl: string;
}
