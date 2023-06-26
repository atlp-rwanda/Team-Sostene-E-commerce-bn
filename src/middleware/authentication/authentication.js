import { decodeToken } from '../../utils';

const isActive = (res, next, status) => {
  if (status === 'INACTIVE') {
    return res.status(406).json({ code: 406, message: 'Account Disabled' });
  }
  return next();
};

const isAuthenticated = async (req, res, next) => {
  function sendResponse() {
    return res.status(401).json({ code: 401, message: 'Please Login' });
  }
  try {
    const header = req.headers.authorization;
    if (!header) {
      return sendResponse();
    }
    const token = header.split(' ')[1];
    const userInfo = decodeToken(token);
    if (!userInfo) {
      return sendResponse();
    }
    req.user = userInfo;
    return isActive(res, next, req.user.status);
  } catch (error) {
    res
      .status(400)
      .json({ code: 400, message: 'Bad Request.', error: error.message });
  }
};

export default isAuthenticated;
