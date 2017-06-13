var express = require('express');
var fs = require('fs');
var multer = require('multer');
var userDAO = require('./DAO/userDAO');


var app = express();

var storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, './uploads/');    
    },

    filename: function(req, file, cb) {
        //var fileFormat = (file.originalname).split('.');
        //cb(null, file.fieldname + '.' + fileFormat[fileFormat.length - 1]);
        cb(null, file.originalname);
    }
});

var jsonWrite = (res, ret) => {
    if (typeof ret === 'undefined') {
        res.json({code: -200, msg: 'Failed'});    
    } else {
        res.json(ret);    
    }
}

var upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;

    console.log('file type: %s', file.mimetype);
    console.log('original file name: %s', file.originalname);
    console.log('file size: %s', file.size);
    console.log('file path: %s', file.path);

    res.send({res_code : '0'});
});

// test with html
app.get('/form', function(req, res, next) {
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

// get all file from db
app.get('/getfilelist', function(req, res, next) {
    userDAO.queryAll(req, res, next);
});

// query all file ina time range from db
app.get('/getfilelistbydaterange', function(req, res, next) {
    var param = req.query || req.params
    var result = userDAO.queryByDateRange(param);
    console.log(result);
    jsonWrite(res, result);
    res.send(result);
});

app.listen(3000);
