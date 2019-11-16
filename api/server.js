const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const server = express();

const MembersRouter = require('../members/members-router')
const MembersStatusRouter = require('../membersStatus/memberStatus-router')
const MembersRecordsRouter = require('../memberRecords/memberRecords-router')
const routinesRouter = require('../routines/routines-router');
const routinesExercisesRouter = require('../routineExercises/routineExercises-router')

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/members', MembersRouter);
server.use('/api/membersstatus', MembersStatusRouter);
server.use('/api/membersrecords', MembersRecordsRouter);
server.use('/api/routines', routinesRouter);
server.use('/api/routinesexercises', routinesExercisesRouter);
server.use(express.static(__dirname + '/../client/build/'));

server.get('/', (req, res) => {
    res.send("I guess it's working!")
});

module.exports = server;