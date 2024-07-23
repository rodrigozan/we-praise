import { Request, Response } from 'express'
import { Types } from 'mongoose';

import { PostService } from "../services/PostService";

import ValidationHelper from '../helpers/ValidationHelper';

const service = PostService

const validate = ValidationHelper

class PostController {
  public async post(req: Request, res: Response) {
    try {

      const body = req.body
      const userId = new Types.ObjectId(req.params.userId)

      validate.validateUser(userId, body, 'create')
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

      validate.validateUser(userId, body, 'update')

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

      validate.validateUser(userId, body, 'update')

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