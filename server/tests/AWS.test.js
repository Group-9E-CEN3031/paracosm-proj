const upload = require('../upload');
var should = require('should');
const fs = require('fs');
const AWS = require('aws-sdk');
const BUCKET_NAME = 'uploadimagesparacosm';
var config = require('../config/config');

const s3 = new AWS.S3({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secretKey
});

describe('Testing file upload and download to AWS bucket', function() {
    this.timeout(10000);

    let files = ['12345-launch.launch', '12345-calibration.yml', '12345-image.png'];
    let filesContent = [];
    let versions = [];

    it('should be able to upload files', function(done) {
        for(let i = 0; i < files.length; i++)
        {
            let name = files[i];

            // Read in test files and push to array for comparison with downloaded files later
            const fileContent = fs.readFileSync(name);
            filesContent.push(fileContent);

            // Upload each file and ensure there are no errors
            var params = {
                Bucket: BUCKET_NAME,
                Key: name,
                Body: fileContent
            };
    
            s3.upload(params, function(err, data) {
                should.not.exist(err);
                //console.log(data);
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
                //console.log(name, versions[i])
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: name//,
                    //VersionId: versions[i]
                };
        
                //console.log(filesContent[i].toString());
        
                // Download the same files we just uploaded and ensure there are no errors
                s3.getObject(params, function(err, data) {
                    should.not.exist(err);
                    //console.log(data);

                    // Ensure the downloaded files' contents are the same as the uploaded files' contents
                    data.Body.toString().should.equal(filesContent[i].toString());
                });
            }
    
            done();
        }, 2000);
    });

    it('should be able to delete files', function(done) {
        setTimeout(function() {
            for(let i = 0; i < files.length; i++)
            {
                let name = files[i];
                //console.log(name, versions[i]);
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: name//,
                    //VersionId: versions[i]
                };
        
                // Delete each file we uploaded and ensure there are no errors
                s3.deleteObject(params, function(err, data) {
                    should.not.exist(err);
        
                    console.log('File deleted ', data);
                });
            }
    
            done();
        }, 5000);
    });
})