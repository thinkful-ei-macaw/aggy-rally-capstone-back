const express = require('express');
const xss = require('xss');
const { requireAuth } = require('../middleware/jwt-auth');

/**
 * Router to handle all requests to /users
 */
const profilesRouter = express.Router();
const bodyParser = express.json();
profilesRouter.use(express.json());

const Service = require('../services/service');
const profilesService = new Service('profiles');


/**
 * Removes any possible XSS attack content
 * @param {{}} user the object to remove XSS data from
 */
const sanitizeProfile = profile => {
    if(profile){
      return {
        id: profile.id,
        userid: profile.userid,
        gamemaster: profile.gamemaster,
        genre: profile.genre,
        romance: profile.romance,
        frequency: profile.frequency,
        duration: profile.duration,
        alignment: profile.alignment,
        groupsize: profile.groupsize,
        pvp: profile.pvp,
        experience: profile.experience,
        gmexp: profile.gmexp,
        playexp: profile.playexp
      };
    }else{
      return {}
    }
};

  profilesRouter.get("/", requireAuth, (req, res, next) => {
    const db = req.app.get('db');

    const userid = req.user.id
    console.log('user id', req.user.id)
    profilesService.getProfileByUid(db, userid)
      .then(profile => {
        return res
          .status(200)
          .json(sanitizeProfile(profile));
      })
      .catch(err => next(err));
  });

  profilesRouter.get("/match", (req, res, next) => {
    const db = req.app.get('db');

    const match = {
        genre: req.query.genre, 
        romance: req.query.romance, 
        pvp: req.query.pvp
    }

    profilesService.getMatches(db, match)
      .then(matches => {
        return res
          .status(200)
          .json(matches.map(sanitizeProfile));
      })
      .catch(err => next(err));
  });

  profilesRouter.get("/:userid", (req, res, next) => {
      const db = req.app.get('db');

      const userid = req.params.userid
    
      profilesService.getProfileByUid(db, userid)
        .then(profile => {
          return res
            .status(200)
            .json(sanitizeProfile(profile));
        })
        .catch(err => next(err));
    });
    
  profilesRouter.post('/', bodyParser, requireAuth, (req, res, next) => {
    const db = req.app.get('db');
  
    const {gamemaster, genre, romance, frequency, duration, alignment, groupsize, pvp, experience, gmexp, playexp} = req.body;

    const userid = req.user.id;
    
    const newProfile = {userid, gamemaster, genre, romance, frequency, duration, alignment, groupsize, pvp, experience, gmexp, playexp}

    profilesService.insertItem(db, newProfile)
      .then(profile => {
        return res
          .status(201)
          .json(sanitizeProfile(profile));
      })
      .catch(err => next(err));
  });

  profilesRouter.delete('/profile/:id', requireAuth, (res, req, next) => {
    const db = req.app.get('db');

    const id = req.params.id;

    profilesService.deleteItem(db, id)
      .then(profile => {
        return res 
          .status(204)
          .json();
      })
      .catch(err => next(err));
  })

  //if not gm, genre matching, & romance and pvp must match

  

  module.exports = profilesRouter;