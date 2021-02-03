const mongoose = require('mongoose')
Promise = require('bluebird');
const express = require('express'),
cors = require('cors'),
body_parser = require('body-parser'),
path = require('path');
require('dotenv').config({path: './config/env/' + process.env.NODE_ENV + '.env'});
const indexRouter =  require('../routes/index.route');
const usersRouter = require('../routes/user.route');
const chatRoomRouter = require('../routes/chatroom.route');


// Initialize express app
const app = express();

app.is_running = Promise.pending();

mongoose.connect(process.env.MONGO_API,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }) .then(() => {
      console.log('API is running');
      console.log('Database connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

app.get('/downloads/:filename', (req, res)=>{
  const filePath = path.join(__dirname, '../../public/downloads/'+req.params.filename);
  res.download(filePath);
});

app.use(body_parser.json({limit: '10mb'}));
app.use(body_parser.urlencoded({
  limit: '10mb',
  extended: true
}));

app.use(cors());

app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('public'));


// Showing stack errors
app.set('showStackError', true);



app.use((err, req, res, next) => {
  if (err.name === 'StatusError') res.send(err.status, err.message);
  else next(err);
});

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});


app.use('/', indexRouter);
app.use('/user',usersRouter );
app.use('/chatroom',chatRoomRouter );

app.enable('case sensitive routing');
app.enable('strict routing');




// Handle errors
require('./error-handler')(app);

module.exports = app;
