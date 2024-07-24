import { Router } from "express";

import SongController from "../controllers/SongController";

import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router()
const controller = SongController

/**
 * @openapi
 * /api/users/{userId}/songs:
 *   post:
 *     summary: Create a new song
 *     tags:
 *       - Songs
 *     x-ms-parameterized-host:
 *       - name: "{userId}"
 *         in: path 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               members:
 *                 type: array
 *                 description: Array of objects of the members
 *                 items:
 *                   type: object
 *                   properties:
 *                     id: 
 *                       type: string
 *                       description: Tag one
 *                     instrument: 
 *                       type: string
 *                       description: Tag two
 *               songs:
 *                 type: array
 *                 description: Array of objects of the songs
 *                 items:
 *                   type: object
 *                   properties:
 *                     title: 
 *                       type: string
 *                       description: Title of song
 *                     author: 
 *                       type: string
 *                       description: Author of song
 *                     version: 
 *                       type: array
 *                       description: Array of objects of the versions
 *                       items:
 *                         type: object
 *                         properties:
 *                           interpreter: 
 *                             type: string
 *                             description: Song interpreter
 *                           link: 
 *                             type: string
 *                             description: link of version
 *               author:
 *                 type: string
 *                 description: Author of song
 *     responses:
 *       201:
 *         description: Post criado com sucesso (Post created successfully)
 *       400:
 *         description: Erro na criação do post (Error creating post)
 *       401:
 *         description: Não autorizado (Unauthorized)
 */
router.post('/users/:userId/songs', authMiddleware, controller.create)

/**
 * @openapi
 * /api/songs:
 *   get:
 *     summary: Get all songs
 *     tags:
 *       - Songs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               members:
 *                 type: array
 *                 description: Array of objects of the members
 *                 items:
 *                   type: object
 *                   properties:
 *                     id: 
 *                       type: string
 *                       description: Tag one
 *                     instrument: 
 *                       type: string
 *                       description: Tag two
 *               songs:
 *                 type: array
 *                 description: Array of objects of the songs
 *                 items:
 *                   type: object
 *                   properties:
 *                     title: 
 *                       type: string
 *                       description: Title of song
 *                     author: 
 *                       type: string
 *                       description: Author of song
 *                     version: 
 *                       type: array
 *                       description: Array of objects of the versions
 *                       items:
 *                         type: object
 *                         properties:
 *                           interpreter: 
 *                             type: string
 *                             description: Song interpreter
 *                           link: 
 *                             type: string
 *                             description: link of version
 *               author:
 *                 type: string
 *                 description: Author of song
 *     responses:
 *       201:
 *         description: songs requested successfully
 *       400:
 *         description: Error request songs
 *       401:
 *         description: Unauthorized
 */
router.get('/songs', authMiddleware, controller.get)

/**
 * @openapi
 * /api/songs/{id}:
 *   get:
 *     summary: Get a single song
 *     tags:
 *       - Songs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               members:
 *                 type: array
 *                 description: Array of objects of the members
 *                 items:
 *                   type: object
 *                   properties:
 *                     id: 
 *                       type: string
 *                       description: Tag one
 *                     instrument: 
 *                       type: string
 *                       description: Tag two
 *               songs:
 *                 type: array
 *                 description: Array of objects of the songs
 *                 items:
 *                   type: object
 *                   properties:
 *                     title: 
 *                       type: string
 *                       description: Title of song
 *                     author: 
 *                       type: string
 *                       description: Author of song
 *                     version: 
 *                       type: array
 *                       description: Array of objects of the versions
 *                       items:
 *                         type: object
 *                         properties:
 *                           interpreter: 
 *                             type: string
 *                             description: Song interpreter
 *                           link: 
 *                             type: string
 *                             description: link of version
 *               author:
 *                 type: string
 *                 description: Author of song
 *     responses:
 *       201:
 *         description: song requested successfully
 *       400:
 *         description: Error request song
 *       401:
 *         description: Unauthorized
 */
router.get('/songs/:id', authMiddleware, controller.getById)

/**
 * @openapi
 * /api/users/{userId}/songs/{id}:
 *   put:
 *     summary: Update a song
 *     tags:
 *       - Songs
 *     x-ms-parameterized-host:
 *       - name: "{userId}"
 *         in: path  
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               members:
 *                 type: array
 *                 description: Array of objects of the members
 *                 items:
 *                   type: object
 *                   properties:
 *                     id: 
 *                       type: string
 *                       description: Tag one
 *                     instrument: 
 *                       type: string
 *                       description: Tag two
 *               songs:
 *                 type: array
 *                 description: Array of objects of the songs
 *                 items:
 *                   type: object
 *                   properties:
 *                     title: 
 *                       type: string
 *                       description: Title of song
 *                     author: 
 *                       type: string
 *                       description: Author of song
 *                     version: 
 *                       type: array
 *                       description: Array of objects of the versions
 *                       items:
 *                         type: object
 *                         properties:
 *                           interpreter: 
 *                             type: string
 *                             description: Song interpreter
 *                           link: 
 *                             type: string
 *                             description: link of version
 *               author:
 *                 type: string
 *                 description: Author of song
 *     responses:
 *       201:
 *         description: Post requested successfully
 *       400:
 *         description: Error request post
 *       401:
 *         description: Unauthorized
 */
router.put('/users/:userId/songs/:id', authMiddleware, controller.update)

/**
 * @openapi
 * /api/users/{userId}/songs/{id}:
 *   delete:
 *     summary: Delete a song using ID
 *     tags:
 *       - Songs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: song deleted successfully
 *       404:
 *         description: User not found
 *     security:
 *       - bearerAuth: []
 */
router.delete('/users/:userId/songs/:id', authMiddleware, controller.delete)

export default router
