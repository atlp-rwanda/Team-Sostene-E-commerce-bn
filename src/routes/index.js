// This is where routers will be

// tip:
/**
 *
 * A route is a section of Express code that
 * associates an HTTP verb ( GET , POST , PUT , DELETE , etc.),
 * a URL path/pattern, and a function that is called to handle that pattern
 *
 */

import Express from 'express';
const Router = Express.Router();

Router.get('/test', (req, res) => {
  res.status(200).json({ message: 'TESTED' });
});

export default Router;
