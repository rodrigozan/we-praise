import { Request, Response } from 'express'
import { Types } from "mongoose";

import { MessageService } from "../services/MessageService";

import { messageValidationHelper } from '../helpers/validationHelpers';

const service = MessageService

class ScaleController {
    public async create(req: Request, res: Response) {
        try {
            const body = req.body
            const userId = new Types.ObjectId(req.params.userId)

            await messageValidationHelper.validateEntity(userId, body, 'create', 'role', 'author');
            body.author = userId

            const message = await service.create(body)
            return res.status(200).json(message)
        } catch (error) {
            return res.status(404).json({
                name: error.name,
                message: error.message
            })
        }
    }

    public async get(_req: Request, res: Response) {
        try {
            const message = await service.find()
            return res.status(200).json(message)
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
            const message = await service.findById(id)
            return res.status(200).json(message)
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
          const messageId = new Types.ObjectId(req.params.id)
          const userId = new Types.ObjectId(req.params.userId)          
    
          await messageValidationHelper.validateEntity(userId, body, 'update', 'role', 'author');
    
          const message = await await service.update(messageId, body)
    
          return res.status(200).json(message);
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
          const messageId = new Types.ObjectId(req.params.id)
          const userId = new Types.ObjectId(req.params.userId)
    
          await messageValidationHelper.validateEntity(userId, body, 'delete', 'role', 'author');
    
          await service.delete(messageId)
    
          return res.status(200).json({ message: 'Message deleted successful' })
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