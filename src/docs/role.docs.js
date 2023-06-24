/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - role
 *       properties:
 *         role:
 *           type: string
 *           description: The auto-generated id of the comment
 *       example:
 *         role: SELLER
 */

/**
 * @swagger
 * /users/{id}/role:
 *      patch:
 *          tags: [Admin]
 *          summary: Admin assigns roles to users.
 *          security:
 *            - bearerAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: string
 *              required: true
 *              description: The user id
 *          requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Role'
 *          responses:
 *                  201:
 *                     description: Got all users
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 */

/**
 * @swagger
 * /users/all:
 *      get:
 *          tags: [Admin]
 *          summary: Admin gets all users.
 *          parameters:
 *            - name: page
 *              in: query
 *              required: false
 *              description: The page number to retrieve
 *              schema:
 *                type: integer
 *                default: 1
 *            - name: limit
 *              in: query
 *              required: false
 *              description: The number of items to retrieve per page
 *              schema:
 *                type: integer
 *                default: 10
 *          security:
 *            - bearerAuth: []
 *          responses:
 *                  200:
 *                     description: Got all users
 *
 */

/**
 * @swagger
 * /orders/all:
 *      get:
 *          tags: [Admin]
 *          summary: Admin gets all orders.
 *          security:
 *            - bearerAuth: []
 *          responses:
 *                  200:
 *                     description: Got all orders
 *
 */
