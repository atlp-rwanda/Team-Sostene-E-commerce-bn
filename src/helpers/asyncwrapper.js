export default (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      error,
    });
  }
};
