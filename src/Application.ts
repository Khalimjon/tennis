import { Mongo } from "./modules";
import * as express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as http from 'http';
import routes from './Routes';

export class Application {
    protected _host: string;
    protected _port: number;
    protected _server: Server;
    protected _mongo: Mongo;
    protected _mongoUrl: string;
    protected _express: Express;

    setHost(host: string): Application {
        this._host = host;
        return this;
    }

    setPort(port: number): Application {
        this._port = port;
        return this;
    }

    setServer(v: Server): Application {
        this._server = v;
        return this;
    }

    setMongo(v: Mongo): Application {
        this._mongo = v;
        return this;
    }

    setMongoUrl(mongoUrl: string): Application {
        this._mongoUrl = mongoUrl;
        return this;
    }

    setExpress(v: Express): Application {
        this._express = v;
        return this;
    }

    getHost() {
        return this._host;
    }

    getPort() {
        return this._port;
    }

    getServer() {
        return this._server;
    }
    getMongo(): Mongo {
        return this._mongo;
    }

    getMongoUrl() {
        return this._mongoUrl;
    }

    getExpress() {
        return this._express;
    }

    configMongo(mongoUrl: string) {
        this._mongoUrl = mongoUrl;
        this._mongo = new Mongo().setOptions({ autoIndex: true }).setUrl(this._mongoUrl);
    }

    configServer(host: string, port: number) {
        this._host = host;
        this._port = port;
        this.setExpress(express());
        this.getExpress().use(bodyParser.json({ limit: '50mb' }));
        this.getExpress().use(
            cors({
                origin: '*',
                methods: 'GET,PUT,POST,PATCH,DELETE,OPTIONS',
                allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
                preflightContinue: false,
                optionsSuccessStatus: 204,
            }),
        );
        this.getExpress().use(routes);
        this._server = http.createServer(this.getExpress());
        return this;
    }

    async start() {
        try {
            this.getExpress().listen(this.getPort(), this.getHost);
            await this.getMongo().connect();
        } catch (error) {
            throw error;
        }
    }

    async stop() {
        try {
            this.getServer().close();
            await this.getMongo().disconnect();
        } catch (error) {
            throw error;
        }
    }
}
