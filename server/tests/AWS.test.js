const upload = require('../upload');
var should = require('should');
const fs = require('fs');
const AWS = require('aws-sdk');
const BUCKET_NAME = 'uploadimagesparacosm';
var config = require('../config/config');
const axios = require('axios');

const s3 = new AWS.S3({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secretKey
});

const testFilePath = 'testupload.txt';
const testFileName = 'testupload.txt';

describe('Testing file upload and download to AWS bucket', function() {
    this.timeout(10000);

    it('should be able to upload files', function(done) {
        const fileContent = fs.readFileSync(testFilePath);

        var params = {
            Bucket: BUCKET_NAME,
            Key: testFileName,
            Body: fileContent
        };

        s3.upload(params, function(err, data) {
            should.not.exist(err);
            console.log(data);
        });

        done();
    });

    it('should be able to download files', function(done) {
        setTimeout(function() {
            const params = {
                Bucket: BUCKET_NAME,
                Key: testFilePath
            };
    
            var fileContents = fs.readFileSync(testFilePath);
    
            s3.getObject(params, function(err, data) {
                should.not.exist(err);
                console.log(data.Body.toString());
                data.Body.toString().should.equal(fileContents.toString());
            });
    
            done();
        }, 200);
    });

    it('should be able to delete files', function(done) {
        setTimeout(function() {
            const params = {
                Bucket: BUCKET_NAME,
                Key: testFilePath
            };
    
            s3.deleteObject(params, function(err, data) {
                should.not.exist(err);
    
                console.log('File deleted ', data);
            });
    
            done();
        }, 1000);
    });
})