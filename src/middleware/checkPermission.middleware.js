const checkPermission = (role) => (req, res, next) => {
  if (req.user.role === role) {
    return next();
  }
  return res.status(401).json({ Message: 'Unauthorized' });
};

export default checkPermission;
