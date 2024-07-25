import { Request, Response } from 'express'
import { Types } from "mongoose";

import { SongService } from "../services/SongService";

import { songValidationHelper } from '../helpers/validationHelpers';

const service = SongService

class ScaleController {
    public async create(req: Request, res: Response) {
        try {
            const body = req.body
            const userId = new Types.ObjectId(req.params.userId)

            await songValidationHelper.validateEntity(userId, body, 'create', 'role', 'author');
            body.author = userId

            const song = await service.create(body)
            return res.status(200).json(song)
        } catch (error) {
            return res.status(404).json({
                name: error.name,
                message: error.message
            })
        }
    }

    public async get(_req: Request, res: Response) {
        try {
            const song = await service.find()
            return res.status(200).json(song)
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
            const song = await service.findById(id)
            return res.status(200).json(song)
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
          const songId = new Types.ObjectId(req.params.id)
          const userId = new Types.ObjectId(req.params.userId)          
    
          await songValidationHelper.validateEntity(userId, body, 'update', 'role', 'author');
    
          const song = await service.update(songId, body)
    
          return res.status(200).json(song);
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
          const songId = new Types.ObjectId(req.params.id)
          const userId = new Types.ObjectId(req.params.userId)
    
          await songValidationHelper.validateEntity(userId, body, 'delete', 'role', 'author');
    
          await service.delete(songId)
    
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