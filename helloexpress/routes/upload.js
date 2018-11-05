const express = require('express');
const router = express.Router();
 
const multer = require("multer");
 
let upload = multer({
  dest: "upload/"
})
 
 
// 뷰 페이지 경로
router.get('/show', function(req, res, next) {
  res.render("board")
});
 
 
// 파일 업로드 처리
router.post('/create', upload.single("imgFile"), function(req, res, next) {
  let file = req.file
 
  let result = {
    originalName : file.originalname,
    size : file.size,
  }
 
  res.json(result);
});
 
 
module.exports = router;