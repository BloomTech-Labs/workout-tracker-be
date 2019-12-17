const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const server = express();

const membersRouter = require('../members/members-router')
const memberStatusRouter = require('../membersStatus/memberStatus-router')
const routinesRouter = require('../routines/routines-router');
const routinesExercisesRouter = require('../routineExercises/routineExercises-router')
const memberRoutinesRecordsRouter = require('../memberRoutineRecords/memberRoutineRecords-router');
const exerciseRecordsRouter = require('../exerciseRecords/memberRoutineRecords-router');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/members', membersRouter);
server.use('/api/memberstatus', memberStatusRouter);
server.use('/api/routines', routinesRouter);
server.use('/api/routinesexercises', routinesExercisesRouter);
server.use('/api/memberRoutineRecords', memberRoutinesRecordsRouter);
server.use('/api/exerciseRecords', exerciseRecordsRouter)
server.use(express.static(__dirname + '/../client/build/'));

server.get('/', (req, res) => {
    res.send("I guess it's working!")
});

module.exports = server;