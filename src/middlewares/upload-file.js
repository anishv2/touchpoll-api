const express=require('express');
const multer  = require('multer');
const path=require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/images', file.name);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file);
    }
})

const uploadFile=multer({storage }).single('image'); // here storage which passed as key value pair in multer argument, make sure same name of (key&value) 

 module.exports=uploadFile;