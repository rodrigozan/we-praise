import { Request, Response } from 'express'
import { Types } from "mongoose";

import { CommentService } from "../services/CommentService";

import { commentValidationHelper } from '../helpers/validationHelpers';
import validateUrl from '../helpers/ValidationTypePost';

const service = CommentService

class CommentController {
  public async create(req: Request, res: Response) {
    try {
      const url = req.originalUrl;
      const body = req.body
      const userId = new Types.ObjectId(req.params.userId)
      const postType = validateUrl(url)
      const postTypeId = new Types.ObjectId(req.params.postTypeId)

      await commentValidationHelper.validateEntity(userId, body, 'create', 'role', 'author');
      body.author = userId
      body.role = postType
      body.postTypeId = postTypeId

      const comment = await service.create(body)
      return res.status(200).json(comment)
    } catch (error) {
      return res.status(404).json({
        name: error.name,
        message: error.message
      })
    }
  }

  public async get(req: Request, res: Response) {
    try {
      if (!req.params.postTypeId) {
        return res.status(400).json({ message: 'Missing postTypeId in request' });
      }
      const postTypeId = new Types.ObjectId(req.params.postTypeId)
      const comment = await service.find(postTypeId)

      return res.status(200).json(comment)
    } catch (error) {
      return res.status(404).json({
        name: error.name,
        message: error.message
      })
    }
  }

  public async getById(req: Request, res: Response) {
    try {

      if (!req.params.id) {
        return res.status(400).json({ message: 'Missing id in request' });
      }
      const idParam = req.params.id;

      if (!req.params.postTypeId) {
        return res.status(400).json({ message: 'Missing postTypeId in request' });
      }
      const postTypeId = new Types.ObjectId(req.params.postTypeId)


      if (!idParam || !Types.ObjectId.isValid(idParam)) {
        return res.status(400).json({ message: 'ID inválido ou não fornecido' });
      }

      const id = new Types.ObjectId(idParam);
      const filter = { id };

      const comments = await service.search(filter, postTypeId);
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message
      });
    }
  }


  public async update(req: Request, res: Response) {
    try {

      const body = req.body
      const commentId = new Types.ObjectId(req.params.id)
      const userId = new Types.ObjectId(req.params.userId)

      await commentValidationHelper.validateEntity(userId, body, 'update', 'role', 'author');

      const comment = await service.update(commentId, body)

      return res.status(200).json(comment);
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
      const commentId = new Types.ObjectId(req.params.id)
      const userId = new Types.ObjectId(req.params.userId)

      await commentValidationHelper.validateEntity(userId, body, 'delete', 'role', 'author');

      await service.delete(commentId)

      return res.status(200).json({ message: 'Comment deleted successful' })
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

export default new CommentController()