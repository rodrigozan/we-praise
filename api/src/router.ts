import { Router, Request, Response } from 'express';

class Route {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getRoot(req: Request, res: Response): void {
        res.json({ status: 200, message: 'Entrou na rota root' });
    }

    private routes(): void {
        this.router.get('/', this.getRoot);
    }
}

const route = new Route();

export default route.router;