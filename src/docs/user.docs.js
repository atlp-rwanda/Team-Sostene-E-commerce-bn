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
 *     UserDetails:
 *       type: object
 *       properties:
 *         tel:
 *           type: string
 *           description: The telephone number of the user.
 *         accNo:
 *           type: string
 *           description: The account number of the user.
 *         currency:
 *           type: string
 *           description: The preferred currency of the user.
 *         lang:
 *           type: string
 *           description: The preferred language of the user.
 *         dob:
 *           type: string
 *           format: date
 *           description: The date of birth of the user.
 *         gender:
 *           type: string
 *           description: The gender of the user.
 *         placeOfLiving:
 *           type: string
 *           description: The place of living of the user.
 *         userId:
 *           type: integer
 *           description: The ID of the user.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user details were created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user details were last updated.
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
/**
 * @swagger
 * /users/settings/:id:
 *   post:
 *     summary: Update/add user details
 *     description: Update user details with additional information
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gender:
 *                 type: string
 *               currency:
 *                 type: string
 *               lang:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               placeOfLiving:
 *                 type: string
 *               tel:
 *                 type: string
 *               accNo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully updated
 *                 info:
 *                   $ref: '#/components/schemas/UserDetails'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error, update failed
 *                 error:
 *                   type: string
 *                   example: Unexpected token u in JSON at position 0
 */
