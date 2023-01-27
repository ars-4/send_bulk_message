const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const { send_msg } = require('./sender');
const sender = require('./sender').send_msg;
const get_variables_from_file = require('./filer').get_variables_from_file;
const app = express();
const router = express.Router();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);

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
let variables_from_uploaded_file = [];
let logs = [];

app.get('/', (req, res) => {
  let variables = variables_from_uploaded_file;
  let context = {
    'variables': variables,
    'logs': logs
  }
  res.render(path.join(__dirname + '/html/send_msg.html'), context)
})


// app.get('/', router);

app.post('/upload', upload.single('uploaded_file'), function (req, res, next) {
  uploaded_file_name = req.file.originalname;
  get_variables_from_file('./uploads/' + uploaded_file_name).then((data) => {
    for (let i = 0; i < data.length; i++) {
      variables_from_uploaded_file.push(data[i])
    }
  }).then(() => {
    console.log('Uploaded: ' + req.file.originalname + ' to uploads/');
    res.redirect('/');
  })
})


app.post('/send', upload.none(), (req, res) => {
  let message = req.body['message']
  let type = req.body['type']
  if (uploaded_file_name) {
    sender(message, "./uploads/" + uploaded_file_name, 'wp').then((data) => {
      for (let i = 0; i < data.length; i++) {
        logs.push(data[i])
      }
    }).then(() => {
      res.redirect('/')
    })
  }
  else {
    res.redirect('/')
  }
})

module.exports = app;