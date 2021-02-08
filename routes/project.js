'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();
//MULTER
var crypto = require('crypto')
var multer = require('multer');
const storage = multer.diskStorage({

  destination(req, file, cb) {

    cb(null, './uploads');

  },

  filename(req, file = {}, cb) {

    const { originalname } = file;
    const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];

    crypto.pseudoRandomBytes(16, function (err, raw) {

      cb(null, raw.toString('hex') + Date.now() + fileExtension);

    });

  },

});

var mul_upload = multer({dest: './uploads',storage});


// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', mul_upload.single('image'), ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);
 
module.exports = router;