const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();


router.get('/healthz', (req, res) => {
    console.log('inside get request');
    res.send("successful endpoint check");
});



router.get('*', (req, res) => {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'url not defined'});
  res.send()
});


app.use('/v1/user', require('./Controller/user_controller'));
app.use('/v1/product', require('./Controller/product_controller'));
app.use('/', router);
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Unexpected error');
//})
module.exports = app;