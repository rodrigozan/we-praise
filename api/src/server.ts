import { App } from "./app/app";

interface IServerConfig {
    app: App;
    port: number;
}

class Server {
    private config: IServerConfig;

    constructor(config: IServerConfig) {
        this.config = config;
        this.listen();
    }

    private listen(): void {
        this.config.app.server.listen(this.config.port, () => {
            console.log(`Server running on port ${this.config.port}`);
        });
    }
}

// Exemplo de uso:
const config: IServerConfig = {
    app: new App(),
    port: process.env.PORT ? parseInt(process.env.PORT) : 4000
};

new Server(config);