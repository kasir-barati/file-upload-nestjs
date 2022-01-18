import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
    Secret: 'ABCDEFG....',
}));
