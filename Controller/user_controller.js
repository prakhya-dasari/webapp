const express = require('express');
const router = express.Router();
// const validateRequest = require('./../security/validate-request');
const authorize = require('../Security/authorize.js')
const userService = require('../Services/user_service');
const {validateCreateUser,validateUpdateUser} = require('../Security/validation');
const logger = require('../logger');
const client = require('../statsd');


router.get('/:id',authorize,get_UserDetails)
router.put('/:id',authorize,validateUpdateUser,update_UserDetails);
router.post('/',validateCreateUser,create_UserDetails);
module.exports = router;

function get_UserDetails(req,res,next){
  logger.info("obtaining user details",req.ctx.user.name)
  client.increment('Get_User', 1);
  userService.get_User({username:req.ctx.user.name})
  .then(data => res.json(data))
  .catch(next)
}

function update_UserDetails(req,res,next){
  logger.info("updating user details")
  client.increment('Update_User', 1);
  userService.update_User(req.body,req.ctx.user)
  .then(data => {res.status(204);res.json(data)})
  .catch(next)
}

function create_UserDetails(req,res,next){
  logger.info("creating user details")
  client.increment('Create_User', 1);
  userService.create_User(req.body)
  .then(data => {res.status(201);res.json(data)})
  .catch(data => {console.log(data);res.sendStatus(400);next()});
}