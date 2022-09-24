const schemas = require('./schemas');

const newCategory = async (req, res, next) => {
  const { name } = req.body;

  const validation = schemas.newCategorySchema.validate({ name });
  if (validation.error) {
      return res.status(400).json({ message: validation.error.message });
     }
  next();
};

module.exports = newCategory;