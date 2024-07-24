import { Router } from "express";

import ScaleController from "../controllers/ScaleController";

import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router()
const controller = ScaleController

/**
 * @openapi
 * /api/users/{userId}/scales:
 *   post:
 *     summary: Create a new scale
 *     tags:
 *       - Scales
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
 *                 description: Author of scale
 *     responses:
 *       201:
 *         description: Post criado com sucesso (Post created successfully)
 *       400:
 *         description: Erro na criação do post (Error creating post)
 *       401:
 *         description: Não autorizado (Unauthorized)
 */
router.post('/users/:userId/scales', authMiddleware, controller.create)

/**
 * @openapi
 * /api/scales:
 *   get:
 *     summary: Get all scales
 *     tags:
 *       - Scales
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
 *                   type: string
 *                   properties:
 *                     id: 
 *                       type: string
 *                       description: Id of song
 *               author:
 *                 type: string
 *                 description: Author of scale
 *     responses:
 *       201:
 *         description: Scales requested successfully
 *       400:
 *         description: Error request scales
 *       401:
 *         description: Unauthorized
 */
router.get('/scales', authMiddleware, controller.get)

/**
 * @openapi
 * /api/scales/{id}:
 *   get:
 *     summary: Get a single scale
 *     tags:
 *       - Scales
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
 *                 description: Author of scale
 *     responses:
 *       201:
 *         description: Scale requested successfully
 *       400:
 *         description: Error request scale
 *       401:
 *         description: Unauthorized
 */
router.get('/scales/:id', authMiddleware, controller.getById)

/**
 * @openapi
 * /api/users/{userId}/scales/{id}:
 *   put:
 *     summary: Update a scale
 *     tags:
 *       - Scales
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
 *                 description: Author of scale
 *     responses:
 *       201:
 *         description: Post requested successfully
 *       400:
 *         description: Error request post
 *       401:
 *         description: Unauthorized
 */
router.put('/users/:userId/scales/:id', authMiddleware, controller.update)

/**
 * @openapi
 * /api/users/{userId}/scales/{id}:
 *   delete:
 *     summary: Delete a scale using ID
 *     tags:
 *       - Scales
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scale deleted successfully
 *       404:
 *         description: User not found
 *     security:
 *       - bearerAuth: []
 */
router.delete('/users/:userId/scales/:id', authMiddleware, controller.delete)

export default router
