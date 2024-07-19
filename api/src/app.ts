import express from "express"
import { setupSwagger } from './swagger'
import * as dotenv from 'dotenv'

import { Connection } from './database/Connection'

import router from "./router"

dotenv.config()

export class App {
    public server: express.Application

    constructor() {
        this.server = express()
        this.middleware()
        this.connection()
        this.routes()
        this.documentation()
    }

    private middleware() {
        this.server.use(express.json())
    }

    private routes() {
        this.server.use('/api', router)
    }

    private documentation() {
        setupSwagger(express())
    }

    private async connection() {
        await Connection.connect()
    }
}