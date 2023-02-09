const config = require('./config');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
module.exports = db= {};
let isRunnable= false;
db.initialize = initialize;
initialize();''
console.log("db.js file initiated")
async function initialize() {
  if(isRunnable){
    return;
  }
  console.log("inside initializing")
    // create db if it doesn't already exist
    const { HOST, SERVER_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, DATABASE } = config;

    const connection = await mysql.createConnection({  host: HOST,
      user: MYSQL_USERNAME,
      password: MYSQL_PASSWORD});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`);

    // connect to db
    const sequelize = new Sequelize(DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../Models/user_model')(sequelize);
    db.Product = require('../Models/product_model')(sequelize);

    console.log("after assigning")
    // sync all models with database
    await sequelize.sync();
    isRunnable = true;
    // console.log(await db.User.findOne({where:{id:"ASdf"}}))
}
