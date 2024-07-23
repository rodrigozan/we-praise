import { Router } from 'express';

import PostController from '../controllers/PostController';

import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
const postController = PostController;

/**
 * @openapi
 * /api/users/{userId}/posts:
 *   post:
 *     summary: Cria um novo post
 *     tags:
 *       - Posts
 *     x-ms-parameterized-host:
 *       - name: "{userId}"
 *         in: path  # Indicate the parameter is in the path
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
 *               description:
 *                 type: string
 *                 description: Description of the post
 *               content:
 *                 type: string
 *                 description: Content of the post
 *               author:
 *                 type: string
 *                 description: Content of the post
 *     responses:
 *       201:
 *         description: Post criado com sucesso (Post created successfully)
 *       400:
 *         description: Erro na criação do post (Error creating post)
 *       401:
 *         description: Não autorizado (Unauthorized)
 */
router.post('/users/:userId/posts', postController.post);

/**
 * @openapi
 * /api/posts:
 *   get:
 *     summary: Obtém a lista de todos os posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Lista de posts (List of posts)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID of the post
 *                   title:
 *                     type: string
 *                     description: Title of the post
 *                   description:
 *                     type: string
 *                     description: Description of the post
 *                   author:
 *                     type: string
 *                     description: author of the post
 *                   content:
 *                     type: string
 *                     description: Content of the post
 */
router.get('/posts', postController.get);

/**
 * @openapi
 * /api/posts/{id}:
 *   get:
 *     summary: Obtém um post pelo ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do post (Post details)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the post
 *                 title:
 *                   type: string
 *                   description: Title of the post
 *                 description:
 *                   type: string
 *                   description: Description of the post
 *                 author:
 *                   type: string
 *                   description: author of the post
 *                 content:
 *                   type: string
 *                   description: Content of the post
 *       404:
 *         description: Post não encontrado (Post not found)
 */
router.get('/posts/:id', postController.getOne);

/**
 * @openapi
 * /api/users/{userId}/posts/{postId}:
 *   put:
 *     summary: Atualiza um post pelo ID
 *     tags:
 *       - Posts
 *     x-ms-parameterized-host:
 *       - name: "{userId}"
 *         in: path  
 *     parameters:
 *       - name: postID
 *         in: path
 *         required: trues
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: trues
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
 *               description:
 *                 type: string
 *                 description: Description of the post
 *               author:
 *                 type: string
 *                 description: author of the post
 *               content:
 *                 type: array
 *                 description: Array of objects of the post
 *                 items:
 *                   type: object
 *                   properties:
 *                     title: 
 *                       type: string
 *                       description: Tag one
 *                     content: 
 *                       type: string
 *                       description: Tag one
 *               category:
 *                 type: string
 *                 description: Category of the post
 *               tags:
 *                 type: array
 *                 description: Tags of the post
 *                 items:
 *                   type: string 
 *                   description: Tag one
 *               type:
 *                 type: string
 *                 description: Type of the post
 *               visibility:
 *                 type: string
 *                 description: Visibility of the post
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso (Post updated successfully)
 *       400:
 *         description: Erro na atualização do post (Error updating post)
 *       401:
 *         description: Não autorizado (Unauthorized)
 *       404:
 *         description: Post não encontrado (Post not found)
 */
router.put('/users/:userId/posts/:id', postController.update);

/**
 * @openapi
 * /api/users/{userId}/posts/{id}:
 *   delete:
 *     summary: Deleta um post pelo ID (Deletes a post by ID)
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deletado com sucesso (Post deleted successfully)
 *       401:
 *         description: Não autorizado (Unauthorized)
 *       404:
 *         description: Post não encontrado (Post not found)
 */
router.delete('/users/:userId/posts/:id', authMiddleware, postController.delete);

export default router;