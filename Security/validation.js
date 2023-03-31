const emailValidator = require('email-validator');
const logger = require('../logger');


function validateCreateUser(req, res, next) {
  if(!emailValidator.validate(req.body['username']) ){
    logger.error("Invalid email provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid email provided'});
    return;
  }
  if(!req.body['password'] || req.body['password'].trim().length <= 5){
    logger.error("Invalid password provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid password provided'});
    res.send()
    return;
  }
 
  if(!req.body['last_name'] || req.body['last_name'].trim().length <= 0){
    logger.error("Invalid last name provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid last_name provided'});
    res.send()
    return;
  }
  if(!req.body['first_name'] || req.body['first_name'].trim().length <= 0){
    logger.error("Invalid first name provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid first_name provided'});
    res.send()
    return;
  }
  return next();
}

function validateUpdateUser(req, res, next) {

  logger.info('inside validate')
  if(req.body['username'] ){
    logger.error("Invalid username provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'username can\'t be updated'});
    res.send()
    return;
  }
  if(req.body['update_time'] ){
    logger.error("Invalid update time provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'updated time  can\'t be updated'});
    res.send()
    return;
  }
  if(req.body['create_time'] ){
    logger.error("Invalid create time provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'created time can\'t be updated'});
    res.send()
    return;
  }
  if(req.body['password'] && req.body['password'].trim().length <= 5){
    logger.error("Invalid password provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid password provided'});
    res.send()
    return;
  }
  if(req.body['last_name'] && req.body['last_name'].trim().length <= 0){
    logger.error("Invalid last name provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid last_name provided'});
    res.send()
    return;
  }
  if(req.body['first_name'] && req.body['first_name'].trim().length <= 0){
    logger.error("Invalid first name provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid first_name provided'});
    res.send()
    return;
  }
  return next();
}

function validate_Update_Product(req, res, next) {

  logger.info('inside product validate')
  if(!req.body['name']){
    logger.error("Invalid name provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'name can\'t be empty'});
    return;
  }
  if(!req.body['description']){
    logger.error("Invalid description provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'description can\'t be empty'});
    return;
  }
  if(!req.body['sku']){
    logger.error("Invalid sku provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'sku can\'t be empty'});
    return;
  }
  if(!req.body['manufacturer']){
    logger.error("Invalid manufacturer provided");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'manufacturer can\'t be empty'});
    return;
  }
  // if(!req.body['quantity']){
  //   res.status(400);
  //   res.setHeader('Content-Type', 'application/json');
  //   res.send({"error":'quantity can\'t be empty'});
  //   return;
  // }
  if(req.body['quantity'] && !(Number.isInteger(req.body['quantity']) && req.body['quantity'] >= 0 && req.body['quantity'] <= 100)){
    logger.error("Enter Valid quantity between 0 and 100");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'Enter Valid quantity between 0 and 100'});
    return;
  }
  if(req.body['date_added'] ){
    logger.error("created time  can\'t be updated");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'created time  can\'t be updated'});
    return;
  }
  if(req.body['date_last_updated'] ){
    logger.error("updated time can\'t be updated'");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'updated time can\'t be updated'});
    return;
  }
  return next();
}

function validate_Patch_Product(req, res, next) {

  logger.info('inside product validate')
  
  if(req.body.hasOwnProperty('name') && req.body['name'].trim().length<=0){
    logger.info('inside name'+req.body['name'].trim().length==0)
    logger.error("name can\'t be empty");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'name can\'t be empty'});
    return;
  }
  if(req.body.hasOwnProperty('description') && req.body['description'].trim().length <= 0){
    logger.error("description can\'t be empty");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'description can\'t be empty'});
    return;
  }
  
  if(req.body.hasOwnProperty('sku') && req.body['sku'].trim().length <= 0){
    logger.error("sku can\'t be empty");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'sku can\'t be empty'});
    return;
  }
  if(req.body.hasOwnProperty('manufacturer') && req.body['manufacturer'].trim().length <= 0){
    logger.error("manufacturer can\'t be empty");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'manufacturer can\'t be empty'});
    return;
  }
  if(req.body['quantity'] && !(Number.isInteger(req.body['quantity']) && req.body['quantity'] >= 0 && req.body['quantity'] <=100)){
    logger.error("Enter Valid Quantity");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'Enter valid Quantity'});
    return;
  }
  if(req.body['date_added'] ){
    logger.error("created time  can\'t be updated");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'created time  can\'t be updated'});
    return;
  }
  if(req.body['date_last_updated'] ){
    logger.error("updated time can\'t be updated");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'updated time can\'t be updated'});
    return;
  }
  return next();
}

module.exports={
  validateCreateUser,
  validateUpdateUser,
  validate_Update_Product,
  validate_Patch_Product
}