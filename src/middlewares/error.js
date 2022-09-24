const error = (err, req, res, _next) => {
    const status = err.status || 500;
    const { message } = err;
    console.log('Error', message);
    return res.status(status).json({ error: { message } });
};

module.exports = error;