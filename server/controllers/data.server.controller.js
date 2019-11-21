var mongoose = require('mongoose'),
    Data = require('../models/data.server.model.js'),
    Launch = Data.launch,
    Calibration = Data.calibration,
    Image = Data.image;

executeForDataType = function(req, res, func)
{
    switch(req.type)
    {
        case 'launch': 
            func(req, res, Launch);
            break;
        case 'calibration':
            func(req, res, Calibration);
            break;
        case 'image': 
            func(req, res, Image);
            break;
    }
};

createData = function(req, res, model)
{
    var data = new model(req.body);
    console.log('data: ', data);

    data.save(function(err) {
        if(err)
        {
            console.log(err);
            res.status(404).send(err);
        }
        else
        {
            res.send(data);
            console.log(data);
        }
    });
};

readData = function(req, res, model)
{
    if(req.data)
    {
        /* May need to make methods within the models
           for reading that specific data type */
        res.send(req.data);
    }
    else
        res.status(404).send('Error: No data under that ID exists!');
};

updateData = function(req, res, model)
{
    var data = req.data;

    model.findOneAndUpdate({uuid: data.uuid, data: data.data}, function(err, dataToUpdate) {
        if(err) throw err;

        console.log(dataToUpdate);
    });
}

deleteData = function(req, res, model)
{
    var data = req.data;

    if(!data)
    {
        res.status(404).send('Error: No data under that ID exists!');
        return;
    }

    model.findOneAndDelete({uuid: data.uuid, data: data.data}, function(err, deletedData) {
        if(err) throw err;

        console.log(deletedData)
        res.send(deletedData);
    })
};

listData = function(req, res, model)
{
    model.find({uuid: req.data.uuid}, function(err, data) {
        if(err) throw err;

        res.send(data);
    })
};

getMostRecent = function(array)
{
    if(!array || array.length === 0)
        return null;

    array.sort(function(a, b) {
        a = new Date(a.created_at);
        b = new Date(b.created_at);
        return a>b ? -1 : a<b ? 1 : 0;
    });

    return array[0];
};

exports.create = function(req, res) {
    executeForDataType(req, res, createData);
};

exports.read = function(req, res) {
    executeForDataType(req, res, readData);
};

exports.update = function(req, res) {
    executeForDataType(req, res, updateData);
};

exports.delete = function(req, res) {
    executeForDataType(req, res, deleteData);
};

exports.list = function(req, res) {
    executeForDataType(req, res, listData);
};

exports.setTypeLaunch = function(req, res, next) {
    req.type = 'launch';
    next();   
}

exports.setTypeCalibration = function(req, res, next) {
    req.type = 'calibration';
    next();
}

exports.setTypeImage = function(req, res, next) {
    req.type = 'image';
    next();
}

exports.launchByID = function(req, res, next, id) {
    Launch.find({uuid: id}, function(err, launches) {
        if(err) 
        {
            res.status(400).send(err);
        }
        else
        {
            if(!launches || launches.length === 0)
                next();
            
            else
            {
                req.data = getMostRecent(launches);
                req.type = 'launch';
                next();
            }
        }
    });
};

exports.calibrationByID = function(req, res, next, id) {
    Calibration.find({uuid: id}, function(err, calibrations) {
        if(err) 
        {
            res.status(400).send(err);
        }
        else
        {
            if(!calibrations || calibrations.length === 0)
                next();
            
            else
            {
                req.data = getMostRecent(calibrations);
                req.type = 'calibration';
                next();
            }
        }
    });
};

exports.imageByID = function(req, res, next, id) {
    Image.find({uuid: id}, function(err, images) {
        if(err) 
        {
            res.status(400).send(err);
        }
        else
        {
            if(!images || images.length === 0)
                next();

            else
            {
                req.data = getMostRecent(images);
                req.type = 'image';
                next();
            }
        }
    });
};