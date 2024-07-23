import { Request, Response } from 'express'
import { Types } from "mongoose";

import { ScaleService } from "../services/ScaleService";

import ValidationPostHelper from '../helpers/ValidationPostHelper';

const service = ScaleService

const validate = ValidationPostHelper

class ScaleController {
    public async create(req: Request, res: Response) {
        try {
            const body = req.body
            const userId = new Types.ObjectId(req.params.userId)

            validate.validateUser(userId, body, 'create')
            body.author = userId

            const schema = await service.create(body)
            return res.status(200).json(schema)
        } catch (error) {
            return res.status(404).json({
                name: error.name,
                message: error.message
            })
        }
    }

    public async get(_req: Request, res: Response) {
        try {
            const schema = service.find()
            return res.status(200).json(schema)
        } catch (error) {
            return res.status(404).json({
                name: error.name,
                message: error.message
            })
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const id = new Types.ObjectId(req.params.id)
            const schema = service.findById(id)
            return res.status(200).json(schema)
        } catch (error) {
            return res.status(404).json({
                name: error.name,
                message: error.message
            })
        }
    }
}

export default new ScaleController()