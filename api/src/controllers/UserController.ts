import { Request, Response } from 'express';
import { Types } from 'mongoose';

import { UserService } from '../services/UserService';

const service = UserService;

class UserController {
    public async create(req: Request, res: Response) {
        try {
            const user = await service.create(req.body);
            return res.status(201).send(user);
        } catch (error) {
  
            return res.status(500).send(error.message);
        }
    }

    public async get(_req: Request, res: Response) {
        try {
            const users = await service.find();

            return res.status(200).json(users);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching users' });
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const objectId = new Types.ObjectId(req.params.id)
            const user = await service.findUserById(objectId, '');
            if (!user) {
                return res.status(404).send('User not found');
            }
            console.log('User request:',user)
            return res.status(200).send(user);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            const email = req.body.email
            const user = await service.findOne(email);
            if (!user) {
                return res.status(404).send('User not found');
            }
            console.log('User request:',user)
            return res.status(200).send(user);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { name, email,  celular, instruments, subteam, active, role } = req.body
            const body = { name, email,  celular, instruments, subteam, active, role }
            const objectId = new Types.ObjectId(req.params.id)

            const user = await service.update(objectId, body);
            if (!user) {
                return res.status(404).send();
            }
            return res.status(200).send(user);
        } catch (error) {
            return res.status(500)
                .json(
                    {
                        name: error.name,
                        message: error.message,
                        stack: error.stack
                    }
                );
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const objectId = new Types.ObjectId(req.params.id)
            const user = await service.delete(objectId);
            if (!user) {
                return res.status(404).send();
            }
            return res.status(200).send(user);
        } catch (error) {
            return res.status(500)
                .json(
                    {
                        name: error.name,
                        message: error.message,
                        stack: error.stack
                    }
                );
        }
    }
}

export default new UserController();
