const schemas = require('./schemas');

const newUserValidation = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const validation = schemas.newUserSchema.validate({ displayName, email, password });
  if (validation.error) {
      return res.status(400).json({ message: validation.error.message });
     }
  next();
};

module.exports = newUserValidation;