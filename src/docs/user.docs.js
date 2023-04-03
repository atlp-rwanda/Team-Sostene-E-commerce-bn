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
 *   name: Authentication
 *   description: Authentication  Apis
 * /users/signup:
 *   tags:
 *     - Authentication
 *   post:
 *     summary: Create a new user (signUp)
 *     tags: [Authentication]
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

/**
 * @swagger
 * /users/login:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Logs In a User
 *    description: Logs in a user, And stores session is Redis
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *          example:
 *            email: 'example email'
 *            password: 'example password'
 *    responses:
 *      '200':
 *        description: Logged In Successfully
 *      '406':
 *        description: Unacceptable
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              Message: 'example error'
 * /users/protected-route:
 *  get:
 *    tags:
 *      - Authentication
 *    summary: A protected route requiring login or signup
 *    security:
 *      - bearerAuth: []
 *    description: LogIn or SignUp to access this route
 *    responses:
 *      '200':
 *        description: Logged In Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              Message: 'Logged in Successfully as username .'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              Message: 'Please Login'
 */

/**
 * @swagger
 * /users/logout:
 *  post:
 *      summary: Logout
 *      security:
 *        - bearerAuth: []
 *      description: This API logs the user out
 *      tags: [Authentication]
 *      responses:
 *          200:
 *              description: GET json Message
 *          400:
 *              description: bad request
 */

/**
 * @swagger
 * /users/login/google:
 *  get:
 *      summary: Login with google
 *      description: Provides a link that initialize the google login authentication
 *      tags: [Authentication]
 *      responses:
 *          200:
 *              description: Success
 */
