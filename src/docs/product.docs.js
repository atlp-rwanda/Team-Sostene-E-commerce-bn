/**
 * @swagger
 * components:
 *   schemas:
 *     product:
 *        type: object
 *        required:
 *          - productName
 *          - productPrice
 *          - category
 *          - expDate
 *          - bonus
 *          - quantity
 *          - images
 *        properties:
 *          collectionId:
 *              type: string
 *              description: product collection
 *          productName:
 *              type: string
 *              description: product name
 *          productPrice:
 *              type: double
 *              description: product price
 *          category:
 *              type: string
 *              description: category
 *          expDate:
 *              type: string
 *              format: date
 *              description: expiration date
 *          bonus:
 *              type: double
 *              desciption: bonus on product
 *          quantity:
 *              type: double
 *              description: product quantity
 *          images:
 *              type: string
 *              format: binary
 *              description: product images
 */

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

/**
 * @swagger
 * /products/collection/{cid}:
 *   post:
 *     summary: adding a new product to the database
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: id of the collection to add the product
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
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: product images
 *     responses:
 *       '200':
 *         description: succssefully added the product
 *       '400':
 *         description: Failed to add the product
 */

/**
 * @swagger
 * /products/update/{id}:
 *   patch:
 *     summary: updating a product on add
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the product to update
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
 *               imageIndex:
 *                 type: number
 *                 description: image index to delete
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: product images
 *     responses:
 *       '200':
 *         description: succssefully updated  the product
 *       '400':
 *         description: Failed to update a product
 */
/**
 * @swagger
 * /wishlist/products/add/{pid}:
 *  post:
 *    summary: adding product to the wishlist
 *    tags: [Product]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: pid
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    responses:
 *      '200':
 *        description: Added successfully
 *      '404':
 *        description: Unacceptable
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              Message: 'Not found'
 */

/**
 * @swagger
 * /wishlist/products/delete/{pid}:
 *  delete:
 *    tags:
 *      - Product
 *    summary: delete a product
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: pid
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    description: delete the product from the wishlist
 *    responses:
 *      '200':
 *        description: Deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              Message: 'successfully'
 */
/**
 * @swagger
 * /wishlist/all:
 *  get:
 *    tags:
 *      - Product
 *    summary: retrieve all products in the wishlist
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Retrieve all user product from the wishlist
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              Message: 'Successfully'
 */
