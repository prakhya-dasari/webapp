const server = require("./server.js");

// const db = require('./util/mysql.js');
const CONFIG = require('./Database/config');
console.log("Please here me")
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send({'error':'Bad Request'});
  })
  server.listen(CONFIG.SERVER_PORT,()=>{
    console.log("server started at port: ",CONFIG.SERVER_PORT);
  });

process.on('uncaughtException', function(ex) {
  console.log("server crash triggered");
  console.log(ex);
});