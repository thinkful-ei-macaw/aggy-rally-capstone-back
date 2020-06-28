const express = require('express');
const xss = require('xss');

/**
 * Router to handle all requests to /users
 */
const profilesService = express.Router();
const bodyParser = express.json();
profilesService.use(express.json());

const Service = require('../services/service');
const profilesService = new Service('profiles');

/**
 * Removes any possible XSS attack content
 * @param {{}} user the object to remove XSS data from
 */
// const sanitizeProfile = profile => {
//     return {
//       id: user.id,
//       user_name: xss(user.user_name),
//       password: xss(user.password)
//     };
//   };

profilesService.get("/users/:uid/profiles/:pid", (req, res, next) => {
    const db = req.app.get('db');
  
    profilesService.getItemById(db)
      .then(profile => {
        return res
          .status(200)
          .json(profile.map());
      })
      .catch(err => next(err));
  });
  
  profilesService.post('/', bodyParser, (req, res, next) => {
    const db = req.app.get('db');
  
    const {gamemaster, genre, romance, frequency, duration, alignment, groupsize, pvp, experience, gmexp, playexp} = req.body;
    
    const newProfile = {gamemaster, genre, romance, frequency, duration, alignment, groupsize, pvp, experience, gmexp, playexp}
    profilesService.insertItem(db, newProfile)
      .then(profile => {
        return res
          .status(201)
          .json(profile);
      })
      .catch(err => next(err));
  });

  //if not gm, genre matching, & romance and pvp must match

  