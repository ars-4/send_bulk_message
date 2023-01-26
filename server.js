const express = require('express');
const path = require('path');
const multer  = require('multer');
const app = express();
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname + '/uploads/'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/send_msg.html'))
})


app.get('/', router);

app.post('/upload', upload.single('uploaded_file'), function (req, res, next) {
    console.log('Uploaded: ' + req.file.originalname + ' to uploads/');
    res.redirect('/');
  })


app.post('/send', upload.none(), (req, res) => {
  console.log(req.body['message'])
  res.redirect('/')
})

module.exports = app;