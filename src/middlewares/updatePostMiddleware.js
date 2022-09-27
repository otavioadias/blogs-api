const schemas = require('./schemas');

const newPost = async (req, res, next) => {
  const { title, content } = req.body;

  const validation = schemas.updatePostSchema.validate({ title, content });
  if (validation.error) {
      return res.status(400).json({ message: 'Some required fields are missing' });
     }
  next();
};

module.exports = newPost;