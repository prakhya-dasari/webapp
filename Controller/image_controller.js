
//const { validate } = require('email-validator');
const express = require('express');
const router = express.Router();
const auth = require('../Security/authorize.js')
const imageService = require('../Services/image_service');
const multer = require('multer');
const logger = require('../logger');
const client = require('../statsd');


// Configure multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      return cb(null, true);
    }
    return cb(new Error('Only image files are allowed!'));
  },
}).single('file');




router.post('/product/:pid/image', auth, upload, uploadNewImage);
router.get('/product/:pid/image/:image_id', auth, getImageById);
router.get('/product/:pid/image', auth, getAllImages);
router.delete('/product/:pid/image/:image_id', auth, deleteImage);

function uploadNewImage(req, res, next) {
    logger.info("upload new image")
    client.increment('Upload_ New Image', 1);
    imageService.createImage(req, res)
        .then(data => { res.status(201); res.json(data) })
        .catch(data => { console.log(data); next() });
}

function getImageById(req, res, next) {
  logger.info("Get image by ID:")
  client.increment('Get Image By ID', 1);
    imageService.getImageById(req, res)
        .then(data => { res.status(200); res.json(data) })
        .catch(data => { console.log(data); res.sendStatus(404); next() });
}


function getAllImages(req, res, next) {
  logger.info("get all images")
  client.increment('Get All Images', 1);
    imageService.getAllImages(req, res)
        .then(data => { res.status(200); res.json(data) })
        .catch(data => { console.log(data); res.sendStatus(404); next() });
}

function deleteImage(req, res, next) {
  logger.info("Delete Images")
  client.increment('Delete Image', 1);
    imageService.deleteImage(req, res)
        .then(data => { res.status(204); res.json(data) })
        .catch(data => { console.log(data); next() });
}

module.exports = router;