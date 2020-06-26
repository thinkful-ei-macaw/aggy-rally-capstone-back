const express = require('express');
const xss = require('xss');

/**
 * Router to handle all requests to /users
 */
const usersRouter = express.Router();
const bodyParser = express.json();
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
    user_name: xss(user.user_name),
    password: xss(user.password)
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

usersRouter.post('/', bodyParser, (req, res, next) => {
  const db = req.app.get('db');

  const {user_name, password} = req.body;

  const newUser = {user_name, password}
  usersService.insertItem(db, newUser)
    .then(user => {
      return res
        .status(201)
        .json(sanitize(user));
    })
    .catch(err => next(err));
});

//profiles

usersRouter.post('/', bodyParser, (req, res, next) => {
  const db = req.app.get('db');

  const {gamemaster, genre, romance, frequency, duration, alignment, groupsize, pvp, experience, gmexp, playexp} = req.body;
  
  const newProfile = {gamemaster, genre, romance, frequency, duration, alignment, groupsize, pvp, experience, gmexp, playexp}
  
})

//post request for registration
//post, get, update, delete requests for profiles
///users/:uid/profiles/:pid
//corrisponding service
//tests...

module.exports = usersRouter;