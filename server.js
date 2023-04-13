const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const logger = require('./logger');
const client = require('./statsd');


router.get('/healthz', (req, res) => {
   logger.info('inside get request');
    client.increment('Get Health Check',1)
    res.send("successful endpoint check");
});



router.get('*', (req, res) => {
  logger.info("url not defined");
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'url not defined'});
  res.send()
});


app.use('/v2/user', require('./Controller/user_controller'));
app.use('/v2/product', require('./Controller/product_controller'));
app.use('/v2', require('./Controller/image_controller'));
app.use('/', router);
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Unexpected error');
//})
module.exports = app;