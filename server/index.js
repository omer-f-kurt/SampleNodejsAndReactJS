const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors')

const socketCtrl = require('./controllers/socket');

mongoose.connect('mongodb://localhost:auth/auth');

app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
app.use(cors());

router(app);

const port = process.env.PORT || 3000;
const server =  http.createServer(app);

server.listen(port);

socketCtrl(server);


console.log('Server listenning on ', port);
