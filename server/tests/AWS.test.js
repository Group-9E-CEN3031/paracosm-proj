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

describe('Testing file upload and download to AWS bucket', function() {
    this.timeout(10000);

    let files = ['12345-launch.yml', '12345-calibration.ros', '12345-image.jpg'];
    let filesContent = [];
    let versions = [];

    it('should be able to upload files', function(done) {
        for(let i = 0; i < files.length; i++)
        {
            let name = files[i];

            const fileContent = fs.readFileSync(name);
            filesContent.push(fileContent);

            var params = {
                Bucket: BUCKET_NAME,
                Key: name,
                Body: fileContent
            };
    
            s3.upload(params, function(err, data) {
                should.not.exist(err);
                console.log(data);
                versions.push(data.VersionId);
            });
        }

        done();
    });

    it('should be able to download files', function(done) {
        setTimeout(function() {
            for(let i = 0; i < files.length; i++)
            {
                let name = files[i];

                const params = {
                    Bucket: BUCKET_NAME,
                    Key: name,
                    VersionId: versions[i]
                };
        
                //console.log(filesContent[i].toString());
        
                s3.getObject(params, function(err, data) {
                    should.not.exist(err);
                    console.log(data);
                    data.Body.toString().should.equal(filesContent[i].toString());
                });
            }
    
            done();
        }, 500);
    });

    it('should be able to delete files', function(done) {
        setTimeout(function() {
            for(let i = 0; i < files.length; i++)
            {
                let name = files[i];
                console.log(name, versions[i]);
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: name,
                    VersionId: versions[i]
                };
        
                s3.deleteObject(params, function(err, data) {
                    should.not.exist(err);
        
                    console.log('File deleted ', data);
                });
            }
    
            done();
        }, 3000);
    });
})