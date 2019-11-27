const AWS = require('aws-sdk');
const BUCKET_NAME = 'uploadimagesparacosm';
var config = require('./config/config');

const s3 = new AWS.S3({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secretKey
});

const downloadFile = () => {
    const downloadParams = {
      Bucket: BUCKET_NAME,
      Key: '44434-Materials in Blender (2).pdf'
    }
    s3.getObject(downloadParams, function(err, data){
      if (err) {
        console.log(err, err.stack);
      }
      else{
        console.log(data);
      }
    });
  }

  module.exports.downloadFile = downloadFile;