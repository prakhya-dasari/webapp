const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const db = require('../Database/db');
const logger = require('../logger');


async function  create_User(user) {
  await db.initialize();
  const userDetails = await db.User.findOne({ where: { username: user.username } })
  if (userDetails) {
    throw user.username + " already exists";
    return;
  }
  if (user.password) {
    user.hash = await bcrypt.hash(user.password, 10);
  }
  //user.id = uuid.v4();
  let date_object = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  user.create_time = date_object;
  user.update_time = date_object;
  user.password = user.hash;
  await db.User.create(user);
  const det = await db.User.findOne({ where: { username: user.username } })
  let {id,username,first_name,last_name,create_time,update_time}=det;
  return {id,username,first_name,last_name,create_time,update_time};
}

async function update_User(data,user){
  logger.info('inside update user')
  let userDetails = await db.User.findOne({ where: { username: user.name } })
  if (!userDetails) {
    throw user.username + " does not exists";
    return;
  }
  userDetails = userDetails.dataValues
  if (data.password) {
    userDetails.password = await bcrypt.hash(data.password, 10);
  }
  if(data.create_time){
    delete user.create_time;
  }

  if(data.update_time){
    delete user.update_time;
  }
  if(data.first_name){
    userDetails.first_name = data.first_name
  }
  if(data.last_name){
    userDetails.last_name = data.last_name
  }
  let date_object = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  userDetails.update_time = date_object
  db.User.update({password:userDetails.password,
                  first_name:userDetails.first_name,
                  last_name:userDetails.last_name,
                  update_time:userDetails.update_time
                  },{where:{username:user.name}})
  return {id:userDetails.id,username:userDetails.username,first_name:userDetails.first_name,last_name:userDetails.last_name,account_created:userDetails.account_created,account_updated:userDetails.account_updated}
}

async function get_User({username}){
  const data = await db.User.findOne({ where: { username: username } });
  const {id,first_name,last_name,create_time,update_time} = data.dataValues;
  logger.info({id,username,first_name,last_name,create_time,update_time});
  return {id,username,first_name,last_name,create_time,update_time}

}

async function getUserWithHash({username}){
  return await db.User.findOne({ where: { username: username } });
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}
module.exports = {
  // authenticate,
  get_User,
  getUserWithHash,
  update_User,
  create_User
}