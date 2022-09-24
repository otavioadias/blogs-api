const schemas = require('./schemas');

const loginMiddleware = async (req, res, next) => {
  const login = req.body;
  const validation = schemas.loginSchema.validate(login);
  if (validation.error) {
      return res.status(400).json({ message: 'Some required fields are missing' });
     }
  next();
};

module.exports = loginMiddleware;