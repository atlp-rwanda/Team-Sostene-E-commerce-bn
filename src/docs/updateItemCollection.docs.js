/**
 * @swagger
 * /products/update/item/{id}:
 *   patch:
 *     summary: updating an item in the collection
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the item to update in the collection
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: product name
 *               productPrice:
 *                 type: string
 *                 description: product price
 *               category:
 *                 type: string
 *                 description: category
 *               expDate:
 *                 type: string
 *                 format: date
 *                 description: expiration date
 *               bonus:
 *                 type: string
 *                 description: bonus
 *               quantity:
 *                 type: double
 *                 description: quantity
 *               link:
 *                 description: image url to delete
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: product images
 *     responses:
 *       '200':
 *         description: successfully updated  the item in the collection
 *       '400':
 *         description: Failed to update an item in the collection
 */
