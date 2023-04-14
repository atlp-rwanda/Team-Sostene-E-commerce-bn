/**
 * @swagger
 * /cart/{id}:
 *   post:
 *     summary: Adding product on cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the product to added
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: succssefully added Product on cart
 *       '500':
 *         description: Internal Error
 */
