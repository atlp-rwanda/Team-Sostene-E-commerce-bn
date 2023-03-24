/**
 * @swagger
 * components:
 *   schemas:
 *     signup:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username of user
 *         email:
 *           type: string
 *           description: Email of user
 *         password:
 *           type: string
 *           description: Encrypted password of user
 *       example:
 *         username: ishimwe
 *         email: ishimwe@mail.com
 *         password: Pass@12345
 *     response:
 *       type: object
 *       required:
 *          -code
 *       properties:
 *         token:
 *           type: string
 *           description: The generated JWT token
 *         user:
 *           type: string
 *           description: data responded
 *       example:
 *         token: 20
 *         user: {"id": 24,"username": "ishimwe99","email": "ishimwe99@mail.com","password": "$2a$10$UGpjgRhVj/nadSVgpkfl1O6kmRmf4l2yAJafuiqf/7BAn.oEfhtby","updatedAt": "2023-03-20T13:25:22.314Z","createdAt": "2023-03-20T13:25:22.314Z"}
 *     errormessage:
 *       type: object
 *       required:
 *          -code
 *       properties:
 *         code:
 *           type: integer
 *           description: The http response code
 *         message:
 *           type: string
 *           description: message of error response
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users  api
 * /users/signup:
 *   post:
 *     summary: Create a new user (signUp)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signup'
 *     responses:
 *       201:
 *         description: Account Created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 *       409:
 *         description: User Already Exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errormessage'
 */
