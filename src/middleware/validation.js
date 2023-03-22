/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
export default function validate(schema) {
  return (req, res, next) => {
    const Validate = schema.validate(req.body);

    if (Validate.error) {
      res.status(406).send({
        Error: Validate.error.message,
      });
    } else {
      next();
    }
  };
}
