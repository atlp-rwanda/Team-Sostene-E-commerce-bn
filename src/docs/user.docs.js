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
 *         accountNumber:
 *           type: string
 *           description: The account number of the user.
 *         accountName:
 *           type: string
 *           description: The account name of the user.
 *         currency:
 *           type: string
 *           description: The preferred currency of the user.
 *         lang:
 *           type: string
 *           description: The preferred language of the user.
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the user.
 *         gender:
 *           type: string
 *           description: The gender of the user.
 *         country:
 *           type: string
 *           description: The country of living of the user.
 *         postalCode:
 *           type: string
 *           description: The post code of the user.
 *         streetAdress:
 *           type: string
 *           description: The post code of living of the user.
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
 * /users/forgotPassword:
 *   post:
 *     summary: Forget password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: "mirindisaidi19@gmail.com"
 *     responses:
 *       200:
 *         description: Message  sent successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: integer
 *                 message:
 *                  type: string
 *                 data:
 *                  type: object
 *       500:
 *         description: Some server error
 * /users/reset-password/{token}:
 *   put:
 *     summary: reset password
 *     tags: [Authentication]
 *     parameters :
 *       - in: path
 *         name: token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               password: "M@8898mtn"
 *     responses:
 *       200:
 *         description: Reset successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: integer
 *                 message:
 *                  type: string
 *       500:
 *         description: Some server error
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
 * /users/change-password:
 *   patch:
 *     summary: Update user's password
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             oldPassword: Pass@12345
 *             newPassword: newPass@12345
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Password changed successfully
 *       401:
 *         description: Invalid request body
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Incorrect password
 *       500:
 *         description: Internal server error
 *       default:
 *         description: Unexpected error
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
 * /users/disable/{id}:
 *  patch:
 *    tags:
 *      - Authentication
 *    summary: Disables a User
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    description: User Can Disable his account
 *    responses:
 *      '200':
 *        description: Disabled
 *      '406':
 *        description: Unacceptable
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              Message: 'successful'
 */

/**
 * @swagger
 * /users/verify/{email}:
 *   post:
 *     summary: Verifies the OTP for a user
 *     description: Verifies the OTP entered by the user during login and generates a JWT token
 *     security:
 *        - bearerAuth: []
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: The email of the user to verify OTP
 *         type: string
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  verificationCode:
 *                      type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         schema:
 *           type: object
 *       400:
 *         description: Invalid OTP
 *         schema:
 *           type: object
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 */

/**
 * @swagger
 * /users/tfa-enable-disable:
 *   patch:
 *     summary: Enables or disables two-factor authentication for a user
 *     description: Enables or disables two-factor authentication for a user
 *     security:
 *        - bearerAuth: []
 *     tags:
 *       - Authentication
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  tfa_enabled:
 *                      type: string
 *     responses:
 *       200:
 *         description: TFA option enabled or disabled successfully
 *         schema:
 *           type: object
 *       401:
 *         description: Unauthorized access
 *         schema:
 *           type: object
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 * /users/profile:
 *   post:
 *     summary: Update/add user Profiles
 *     description:  User profiles with additional information
 *     tags:
 *       - Users
 *     security:
 *      - bearerAuth: []
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
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               placeOfLiving:
 *                 type: string
 *               tel:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               accountName:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *               streetAdress:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Successfully updated
 *                 info:
 *                   type: object
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
