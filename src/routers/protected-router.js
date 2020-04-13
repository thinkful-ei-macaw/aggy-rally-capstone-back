const express = require('express');
const auth = require('../middleware/auth');

/**
 * Router to handle all requests to /protected
 */
const protectedRouter = express.Router();
protectedRouter.use(auth);

// respond with 200 if they get through the authorization
protectedRouter.get('/', (req, res) => {
  return res
    .status(200)
    .send('This is a protected route.');
});

module.exports = protectedRouter;