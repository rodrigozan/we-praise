import { Request, Response } from 'express'
import { Types } from 'mongoose';

import { PostService } from "../services/PostService";

import { postValidationHelper } from '../helpers/validationHelpers';

const service = PostService

class PostController {
  public async post(req: Request, res: Response) {
    try {

      const body = req.body
      const userId = new Types.ObjectId(req.params.userId)

      await postValidationHelper.validateEntity(userId, body, 'create', 'role', 'author');
      body.author = userId

      const post = await service.create(body)

      return res.status(200).json(post);
    } catch (error) {
      console.log('Error in controller: ', error.message);
      return res.status(400).json({
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
  }

  public async get(_req: Request, res: Response) {
    try {
      const posts = await service.find()
      return res.status(200).json(posts);
    } catch (error) {
      console.log('Error in controller: ', error.message);
      return res.status(400).json({
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = req.params.id
      const posts = await service.findbyId(id || '')
      return res.status(200).json(posts);
    } catch (error) {
      console.log('Error in controller: ', error.message);
      return res.status(400).json({
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
  }

  public async update(req: Request, res: Response) {
    try {

      const body = req.body
      const postId = new Types.ObjectId(req.params.id)
      const userId = new Types.ObjectId(req.params.userId)

      await postValidationHelper.validateEntity(userId, body, 'update', 'role', 'author');

      const post = await service.update(postId, body)

      return res.status(200).json(post);
    } catch (error) {
      console.log('Error in controller: ', error.message);
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
      const postId = new Types.ObjectId(req.params.id)
      const userId = new Types.ObjectId(req.params.userId)

      await postValidationHelper.validateEntity(userId, body, 'delete', 'role', 'author');

      await service.delete(postId)

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

export default new PostController()