const { API_TOKEN } = require('../config');

/**
 * Checks for a correct Bearer token authorization header
 */
function auth(req, res, next){
  const authToken = req.get('Authorization');

  if (!authToken || authToken.split(' ')[1] !== API_TOKEN) {
    return res
      .status(401)
      .json({
        error: { message: 'Unauthorized request' }
      });
  }

  next();
}

module.exports = auth;