import { Request, Response } from 'express'
import { Types } from 'mongoose';

import { PostService } from "../services/PostService";

const service = PostService

class PostController {
  public async post(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      const body = req.body

      const post = await service.create(body, id)
      return res.status(200).json(post);
    } catch (error) {
      console.log('Error in controller: ', error.message);
      return res.status(500).json({
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
      return res.status(500).json({
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
  }
}

export default new PostController()