const schemas = require('./schemas');

const newPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const validation = schemas.newPostSchema.validate({ title, content, categoryIds });
  if (validation.error) {
      return res.status(400).json({ message: validation.error.message });
     }
  next();
};

module.exports = newPost;