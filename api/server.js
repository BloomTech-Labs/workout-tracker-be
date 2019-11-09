const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const server = express();

const authRouter = require('../auth/auth-router');
const routinesRouter = require('../routines/routines-router');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(express.static(__dirname + '/../client/build/'));

server.use('/api/auth', authRouter);
server.use('/api/routines', routinesRouter);

server.get('/', (req, res) => {
    res.send("I guess it's working!")
});

module.exports = server;