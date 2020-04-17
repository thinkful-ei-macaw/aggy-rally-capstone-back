const express = require('express');
const xss = require('xss');

/**
 * Router to handle all requests to /users
 */
const usersRouter = express.Router();
usersRouter.use(express.json());

const Service = require('../services/service');
const usersService = new Service('users');

/**
 * Removes any possible XSS attack content
 * @param {{}} user the object to remove XSS data from
 */
const sanitize = user => {
  return {
    id: user.id,
    emp_name: xss(user.emp_name),
    job_title: xss(user.job_title)
  };
};

// respond with all records on the base route
usersRouter.get('/', (req, res, next) => {
  const db = req.app.get('db');

  usersService.getAllItems(db)
    .then(users => {
      return res
        .status(200)
        .json(users.map(sanitize));
    })
    .catch(next);

});

// respond with matching record when ID is provided
// otherwise, respond with 404
usersRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get('db');

  usersService.getItemById(db, id)
    .then(user => {
      if (user) {
        return res
          .status(200)
          .json(sanitize(user));
          
      } else {
        return res
          .status(404)
          .json({
            error: { message: 'user not found' }
          });
      }
      
    })
    .catch(next);
});

module.exports = usersRouter;