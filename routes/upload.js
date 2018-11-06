const express = require('express');
const router = express.Router();

const multer = require("multer");

let upload = multer({
  dest: "/home/hosting_users/kkd89/apps/kkd89_kkd89/upload/"
})


router.get('/show', function(req, res, next) {
  res.render("board")
});


router.post('/create', upload.single("imgFile"), function(req, res, next) {
  let file = req.file

  let result = {
    originalName : file.originalname,
    size : file.size,
  }

  res.json(result);
});


module.exports = router;
