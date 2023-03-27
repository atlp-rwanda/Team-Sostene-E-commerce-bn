import Jwt from 'jsonwebtoken';
import redisClient from '../helpers/redis';

const isAuthenticated = async (req, res, next) => {
  const id = req.cookies.session_id;
  if (!id) {
    return res.status(401).json({ Message: 'Please Login' });
  }
  const redisToken = await redisClient.get(id, (err, data) => data);
  if (redisToken) {
    Jwt.verify(redisToken, process.env.JWT_SECRET, async (err, payload) => {
      req.user = payload.user;
    });
    return next();
  }
  return res.status(401).json({ Message: 'Please Login' });
};

export default isAuthenticated;
