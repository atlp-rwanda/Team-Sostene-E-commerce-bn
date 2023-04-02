import jwt from 'jsonwebtoken';

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}
function decodeToken(token) {
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  return verify;
}

export { generateToken, decodeToken };
