const express = require('express');
const path = require('path');
const multer  = require('multer');
const { send_msg } = require('./sender');
const sender = require('./sender').send_msg;
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
let uploaded_file_name;

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/send_msg.html'))
})


app.get('/', router);

app.post('/upload', upload.single('uploaded_file'), function (req, res, next) {
    uploaded_file_name = req.file.originalname;
    console.log('Uploaded: ' + req.file.originalname + ' to uploads/');
    res.redirect('/');
  })


app.post('/send', upload.none(), (req, res) => {
  let message = req.body['message']
  if(uploaded_file_name) {
    send_msg(message, "./uploads/" + uploaded_file_name)
  }
  res.redirect('/')
})

module.exports = app;