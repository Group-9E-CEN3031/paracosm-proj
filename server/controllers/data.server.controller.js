var AWS = require('aws-sdk');
const config = require('../config/config');
const BUCKET_NAME = 'uploadimagesparacosm';

/*const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
});*/

const s3 = new AWS.S3({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secretKey,
    region: 'us-east-2'
});

getMostRecentLaunch = function(uuid, files) {
    
    return new Promise(resolve => {

        // Define file name to search
        let params = {
            Bucket: BUCKET_NAME,
            Prefix: uuid + '-launch.launch'
        };

        s3.listObjectVersions(params, function (err, data) {
            if (err)
                console.log(err);

            //console.log(data);
            if (data.Versions.length === 0) {
                files.launch = null;
                resolve();
                return;
            }

            // Get and return most recent launch file
            let latest = data.Versions[0];
            let fileParams = {
                Bucket: BUCKET_NAME,
                Key: latest.Key,
                VersionId: latest.VersionId
            };
            files.launch = fileParams;
            //console.log(files.launch);

            resolve();
        })
    });
};

getMostRecentCalibration = function(uuid, files) {
    
    return new Promise(resolve => {

        // Define file name to search
        let params = {
            Bucket: BUCKET_NAME,
            Prefix: uuid + '-calibration.yml'
        };

        s3.listObjectVersions(params, function (err, data) {
            if (err)
                console.log(err);
            //console.log(data);
            if (data.Versions.length === 0) {
                files.calibration = null;
                resolve();
                return;
            }

            // Get and return most recent calibration file
            let latest = data.Versions[0];
            let fileParams = {
                Bucket: BUCKET_NAME,
                Key: latest.Key,
                VersionId: latest.VersionId
            };
            files.calibration = fileParams;
            //console.log(files.calibration);

            resolve();
        })
    });
};

getMostRecentImage = function(uuid, files) {
    
    return new Promise(resolve => {

        // Define file name to search
        let params = {
            Bucket: BUCKET_NAME,
            Prefix: uuid + '-image.png'
        };

        s3.listObjectVersions(params, function (err, data) {
            if (err)
                console.log(err);
            //console.log(data);
            if (data.Versions.length === 0) {
                files.image = null;
                resolve();
                return;
            }

            // Get and return latest image file
            let latest = data.Versions[0];
            let fileParams = {
                Bucket: BUCKET_NAME,
                Key: latest.Key,
                VersionId: latest.VersionId
            };
            files.image = fileParams;
            //console.log(files.image);

            resolve();
        })
    });
};

getMostRecent = async function(uuid) {
    
    // Return most recent launch, calibration, and image files
    let files = {};
    await getMostRecentLaunch(uuid, files);
    await getMostRecentCalibration(uuid, files);
    await getMostRecentImage(uuid, files);

    //console.log(await files);
    return files;
};

// Creates a signed url for a file to be downloaded that expires after a set time
createUrl = function(fileParams) {
    let expireTime = 60 * 5; // Expires in 5 minutes
    
    return s3.getSignedUrl('getObject', {
        Bucket: BUCKET_NAME,
        Key: fileParams.Key,
        VersionId: fileParams.VersionId,
        Expires: expireTime
    });
}

// Returns the download links for UUID specified in HTTP request
exports.getUrls = async function(req, res) {
    let fileParams = await getMostRecent(req.uuid);
    
    //console.log(fileParams);
    let urls = {};
    if(fileParams.launch != null) urls.launch = createUrl(fileParams.launch);
    if(fileParams.calibration != null) urls.calibration = createUrl(fileParams.calibration);
    if(fileParams.image != null) urls.image = createUrl(fileParams.image);
    
    res.send(urls);
};

// Sends error if HTTP request has empty UUID parameter
exports.emptyUUID = function(req, res) {
    res.status(404).send('Error: Must have a UUID!');
};

// Add UUID to request
exports.getByUUID = function(req, res, next, id) {
    //console.log(id);
    if(req) req.uuid = id;

    next();
};
