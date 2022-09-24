const { authTokenValidation } = require('../utils/JWT');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    const payload = await authTokenValidation(token);
    
    if (!payload) {
        const e = new Error('Expired or invalid token');
        e.status = 401; 
        throw e;
    }
    next();
};

module.exports = authMiddleware;