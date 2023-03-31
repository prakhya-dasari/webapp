const express = require('express');
const router = express.Router();
const logger = require('../logger');
const client = require('../statsd');


const auth = require('../Security/authorize')
const product_Service = require('../Services/product_service');
const {validate_Update_Product,validate_Patch_Product} = require('../Security/validation');

console.log("Please here me prod controller")
router.post('/',auth,validate_Update_Product,create_Newproduct);
router.put('/:pid',auth,validate_Update_Product,update_ProductDetails);
router.get('/:pid', getProductById);
router.patch('/:pid', auth,validate_Patch_Product, patch);
router.delete('/:pid', auth, deleteProduct);

function create_Newproduct(req,res,next){
  logger.info("creating a new product")
  client.increment('Create new Product', 1);
    product_Service.create_Newproduct(req.body,req,res)
  .then(data => {res.status(201);res.json(data)})
  .catch(data => {console.log(data);res.sendStatus(400);next()});
}

function update_ProductDetails(req,res,next){
  logger.info("update product")
  client.increment('Update Product Details', 1);
    product_Service.update_ProductDetails(req,res)
  .then(data => {res.status(204);res.json(data)})
  .catch(data => {console.log(data);res.sendStatus(400);next()});
}

function getProductById(req, res, next) {
  logger.info("get product")
  client.increment('Get Product', 1);
    product_Service.getProductById(req.params.pid)
        .then(product => res.json(product))
        .catch(product=> {res.status(404).send("Product is not present in the database");next()});
}

function patch(req, res, next) {
  logger.info("patch product")
  client.increment('Patch Product', 1);
    product_Service.patch(req.params.pid, req.body,req,res)
        .then(product => res.status(204).json(product))
        .catch(next);
}

function deleteProduct(req, res, next) {
  logger.info("delete product")
  client.increment('Delete Product', 1);
    product_Service.deleteProduct(req.params.pid, req, req.body)
        .then(product => res.status(204).json(product))
        .catch(next);
}

module.exports = router;