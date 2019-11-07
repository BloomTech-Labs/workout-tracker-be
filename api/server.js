const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(express.static(__dirname + '/../client/build/'));

module.exports = server;