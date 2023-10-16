import { Application } from './Application';
import * as dotenv from 'dotenv';

dotenv.config();

export const app = new Application();
(async () => {
    app.configServer(process.env.APP_HOST, Number(process.env.APP_PORT)).configMongo(process.env.MONGO_URL);
    try {
        console.log(process.env.APP_HOST);
        await app.start();
        console.log(`Application is running ${app.getHost()}:${app.getPort()}`);
    } catch (error) {
        console.error(error);
        await app.stop();
    }
})();
