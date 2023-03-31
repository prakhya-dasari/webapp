const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const logger = require('./logger');

const env = process.env

const bucketName = env.S3_BUCKET_NAME;


const s3 = new aws.S3();


const uploadImage = (file) => {
  const fileStream = Buffer.from(file.buffer, 'binary');
  const params = {
    Bucket: bucketName,
    Key: `${uuidv4()}/${file.originalname}`,
    Body: fileStream
  }

  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
  return params.Key;
}

const deleteFile = (originalname) => {
  const params = {
    Bucket: bucketName,
    Key: originalname,
  };
  s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
  })
}
 


module.exports = { uploadImage, deleteFile }