/**
 * @swagger
 * /products/create-collection:
 *  post:
 *    tags:
 *      - Product
 *    summary: Creates a Collection
 *    security:
 *      - bearerAuth: []
 *    description: Created a collection.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *          example:
 *            name: 'example collection name'
 *    responses:
 *      '201':
 *        description: Collection Created.
 *      '406':
 *        description: Unacceptable
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              code: 406
 *              message: 'Not Acceptable'
 * /products/{cid}/delete:
 *   delete:
 *     summary: Delete Collection
 *     parameters :
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description : object id of collection
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Collection Deleted
 */
