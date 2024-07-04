
import express from "express";
import dotenv from "dotenv";

import router from "../router";

dotenv.config()

export class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.routes();
    }

    private middleware() {
        this.server.use(express.json());
    }

    private routes() {
        this.server.use(router);
    }
}