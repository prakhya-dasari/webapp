const express = require('express');
const router = express.Router();
// const validateRequest = require('./../security/validate-request');
const authorize = require('../Security/authorize.js')
const userService = require('../Services/user_service');
const {validateCreateUser,validateUpdateUser} = require('../Security/validation');

router.get('/self',authorize,get_UserDetails)
router.put('/self',authorize,validateUpdateUser,update_UserDetails);
router.post('/',validateCreateUser,create_UserDetails);
module.exports = router;

function get_UserDetails(req,res,next){
  userService.get_User({username:req.ctx.user.name})
  .then(data => res.json(data))
  .catch(next)
}

function update_UserDetails(req,res,next){
  userService.update_User(req.body,req.ctx.user)
  .then(data => {res.status(204);res.json(data)})
  .catch(next)
}

function create_UserDetails(req,res,next){
  userService.create_User(req.body)
  .then(data => {res.status(201);res.json(data)})
  .catch(data => {console.log(data);res.sendStatus(400);next()});
}