const config = require('./config');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const logger = require('../logger');


module.exports = db= {};
let isRunnable= false;
db.initialize = initialize;
initialize();''
console.log("db.js file initiated")
async function initialize() {
  if(isRunnable){
    return;
  }
  logger.info("inside initializing")
    // create db if it doesn't already exist
    const { DB_PORT,HOST, SERVER_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, DATABASE } = config;

    const connection = await mysql.createConnection({  host: HOST,
      user: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      port:DB_PORT});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`);

    // connect to db
    const sequelize = new Sequelize(DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, { host: config.HOST,dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../Models/user_model')(sequelize);
    db.Product = require('../Models/product_model')(sequelize);
    db.Image = require('../Models/image_model')(sequelize);

    console.log("after assigning")
    // sync all models with database
    await sequelize.sync();
    isRunnable = true;
    // console.log(await db.User.findOne({where:{id:"ASdf"}}))
}
