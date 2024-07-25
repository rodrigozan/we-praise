import { Request, Response } from 'express'
import { Types } from "mongoose";

import { ScaleService } from "../services/ScaleService";

import { scaleValidationHelper } from '../helpers/validationHelpers';

const service = ScaleService

class ScaleController {
    public async create(req: Request, res: Response) {
        try {
            const body = req.body            
            const userId = new Types.ObjectId(req.params.userId)

            await scaleValidationHelper.validateEntity(userId, body, 'create', 'role', 'author');
            body.author = userId

            const scale = await service.create(body)
            return res.status(200).json(scale)
        } catch (error) {
            return res.status(404).json({
                name: error.name,
                message: error.message
            })
        }
    }

    public async get(_req: Request, res: Response) {
        try {
            const scale = await service.find()
            return res.status(200).json(scale)
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
            const scale = await service.findById(id)
            return res.status(200).json(scale)
        } catch (error) {
            return res.status(404).json({
                name: error.name,
                message: error.message
            })
        }
    }
    public async update(req: Request, res: Response) {
        try {
    
          const body = req.body
          const scaleId = new Types.ObjectId(req.params.id)
          const userId = new Types.ObjectId(req.params.userId)
    
          await scaleValidationHelper.validateEntity(userId, body, 'update', 'role', 'author');
    
          const scale = await service.update(scaleId, body)
    
          return res.status(200).json(scale);
        } catch (error) {

          return res.status(400).json({
            name: error.name,
            message: error.message,
            stack: error.stack
          })
        }
      }
      public async delete(req: Request, res: Response) {
        try {
          const body = req.body
          const scaleId = new Types.ObjectId(req.params.id)
          const userId = new Types.ObjectId(req.params.userId)
    
          await scaleValidationHelper.validateEntity(userId, body, 'delete', 'role', 'author');
    
          await service.delete(scaleId)
    
          return res.status(200).json({ message: 'User deleted successful' })
        }
        catch (error) {
          return res.status(400).json({
            name: error.name,
            message: error.message,
            stack: error.stack
          })
        }
      }
}

export default new ScaleController()